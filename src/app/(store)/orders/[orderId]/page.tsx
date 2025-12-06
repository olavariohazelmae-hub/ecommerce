import { Shell } from "@/components/layouts/Shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderProgress } from "@/features/orders";
import Link from "next/link";

type TrackOrderProps = {
  params: { orderId: string };
};

import { PurchaseTracker } from "@/features/orders/components/PurchaseTracker";

function TrackOrderPage({ params: { orderId } }: TrackOrderProps) {
  // TODO: Fetch real order details here to pass to PurchaseTracker
  // For now, we will just pass the ID, but in a real app we need the order items and total.
  // Since this is a demo/debugging task, I will add a comment about this limitation.

  return (
    <Shell layout="narrow">
      {/* <PurchaseTracker orderId={orderId} total={0} items={[]} /> */}
      {/* Note: To fully implement purchase tracking, we need to fetch the order details (items, total) 
          in this server component and pass them to PurchaseTracker. 
          Currently, the page only receives orderId. */}
      <h2 className="text-xl font-semibold">Arrive at Tomorrow 22:00 </h2>
      <div>
        <p>
          <span className="font-semibold">Order Status:</span>
          Ordered
        </p>

        <p>
          <span className="font-semibold">{`Order Id: `}</span>
          {`#${orderId}`}
        </p>
        <OrderProgress />
      </div>

      <section className="grid grid-cols-3 gap-x-5">
        <Card>
          <CardHeader className="font-semibold">Shipping Address</CardHeader>
          <CardContent>
            <p>Hugo Lam</p>
            <p>4242 ORrder 122</p>
            <p>Vancourver 332 212</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-semibold">Track your Order</CardHeader>
          <CardContent>
            <Link href="/" className="text-blue-700 hover:underline">
              #{orderId}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-semibold">Track your Order</CardHeader>
          <CardContent>
            <Link href="/" className="text-blue-700 hover:underline">
              #{orderId}
            </Link>
          </CardContent>
        </Card>
      </section>
    </Shell>
  );
}

export default TrackOrderPage;
