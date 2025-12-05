"use client";

import { useEffect } from "react";
import { viewItem } from "@/lib/analytics";

type Props = {
    product: {
        id: string;
        name: string;
        price: any;
    };
};

export const ProductAnalyticsTracker = ({ product }: Props) => {
    useEffect(() => {
        viewItem(product);
    }, [product]);

    return null;
};
