type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value: number;
};

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Enhanced Ecommerce Events
export const viewItem = (item: any) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "view_item", {
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
        });
    }
};

export const addToCart = (item: any) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "add_to_cart", {
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
        });
    }
};

export const beginCheckout = (items: any[]) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        const value = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        (window as any).gtag("event", "begin_checkout", {
            currency: "USD",
            value: value,
            items: items.map((item) => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        });
    }
};
