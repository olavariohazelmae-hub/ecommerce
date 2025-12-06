import { getProductsByIds } from "@/_actions/products";
import type { CartItems } from "@/features/carts";
import { stripe } from "@/lib/stripe";
import db from "@/lib/supabase/db";
import { SelectProducts, orders } from "@/lib/supabase/schema";
import { getURL } from "@/lib/utils";
import { orderLines } from "./../../../lib/supabase/schema";

import { User, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const orderProductsSchema = z.object({
  orderProducts: z.record(
    z.object({
      quantity: z.number().min(1), // Assuming quantity should be at least 1
    }),
  ),
  guest: z.boolean(),
});

type OrderProducts = CartItems;

export async function POST(request: Request) {
  const data = (await request.json()) as {
    orderProducts: OrderProducts;
    guest: boolean;
  };

  let user: User | undefined;

  const validation = orderProductsSchema.safeParse(data);
  const supabase = createRouteHandlerClient({ cookies });

  if (!validation.success)
    return NextResponse.json(
      { error: "Invalid data format.", details: validation.error },
      { status: 400 }
    );

  try {
    const productsQuantity = await mergeProductDetailsWithQuantities(
      data.orderProducts,
    );

    const amount = calcSubtotal(productsQuantity);

    const insertedOrder = await db
      .insert(orders)
      .values({
        user_id: !data.guest
          ? (await supabase.auth.getUser()).data.user.id
          : null,
        currency: "cad",
        amount: `${amount}`,
        order_status: "pending",
        payment_status: "unpaid",
        payment_method: "card",
      })
      .returning();

    await db.insert(orderLines).values(
      productsQuantity.map(({ id, quantity, price }) => ({
        productId: id,
        quantity,
        price: `${price}`,
        orderId: insertedOrder[0].id,
      })),
    );

    const baseUrl = getURL();
    const successUrl = `${baseUrl}orders/${insertedOrder[0].id}`;
    const cancelUrl = `${baseUrl}cart`;

    console.log("Checkout URLs:", { baseUrl, successUrl, cancelUrl });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      client_reference_id: insertedOrder[0].id,
      line_items: productsQuantity.map(({ name, price, quantity }) => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: name,
          },
          unit_amount: parseFloat(price) * 100,
        },
        quantity: quantity,
      })),
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: "Internal Error", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

const calcSubtotal = (
  productsQuantity: (SelectProducts & { quantity: number })[],
) =>
  productsQuantity.reduce((acc, cur) => {
    return acc + cur.quantity * parseFloat(cur.price);
  }, 0);

const mergeProductDetailsWithQuantities = async (
  orderProducts: OrderProducts,
): Promise<(SelectProducts & { quantity: number })[]> => {
  const productIds = Object.keys(orderProducts);
  const products = await getProductsByIds(productIds);

  const orderDetails = products.map((product) => {
    const quantity = orderProducts[product.id].quantity;
    return { ...product, quantity };
  });

  return orderDetails;
};
