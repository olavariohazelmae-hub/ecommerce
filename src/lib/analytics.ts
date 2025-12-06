type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value: number;
};

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const pageview = (url: string) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "page_view",
            page: url,
        });
    }
};

export const event = ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: action,
            category: category,
            label: label,
            value: value,
        });
    }
};

// Enhanced Ecommerce Events
export const viewItem = (item: any) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            event: "view_item",
            ecommerce: {
                currency: "USD",
                value: item.price,
                items: [
                    {
                        item_id: item.id,
                        item_name: item.name,
                        price: item.price,
                        quantity: 1,
                    },
                ],
            },
        });
    }
};

export const addToCart = (item: any) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            event: "add_to_cart",
            ecommerce: {
                currency: "USD",
                value: item.price,
                items: [
                    {
                        item_id: item.id,
                        item_name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    },
                ],
            },
        });
    }
};

export const beginCheckout = (items: any[]) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        const value = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            event: "begin_checkout",
            ecommerce: {
                currency: "USD",
                value: value,
                items: items.map((item) => ({
                    item_id: item.id,
                    item_name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
        });
    }
};

export const purchase = (transactionId: string, value: number, items: any[]) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            event: "purchase",
            ecommerce: {
                transaction_id: transactionId,
                value: value,
                currency: "USD",
                items: items.map((item) => ({
                    item_id: item.id,
                    item_name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
        });
    }
};

declare global {
    interface Window {
        dataLayer: any[];
    }
}
