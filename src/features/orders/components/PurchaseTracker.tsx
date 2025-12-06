"use client";

import { useEffect } from "react";
import { purchase } from "@/lib/analytics";

interface PurchaseTrackerProps {
    orderId: string;
    total: number;
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
}

export function PurchaseTracker({ orderId, total, items }: PurchaseTrackerProps) {
    useEffect(() => {
        purchase(orderId, total, items);
    }, [orderId, total, items]);

    return null;
}
