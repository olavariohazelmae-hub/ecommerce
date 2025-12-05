"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FreeShippingBannerProps {
    subtotal: number;
    threshold?: number;
    className?: string;
}

export function FreeShippingBanner({
    subtotal,
    threshold = 80,
    className,
}: FreeShippingBannerProps) {
    const remaining = Math.max(0, threshold - subtotal);
    const progress = Math.min(100, (subtotal / threshold) * 100);
    const isFreeShipping = subtotal >= threshold;

    return (
        <div className={cn("w-full space-y-3 border rounded-lg p-4 bg-secondary/20", className)}>
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium">
                    {isFreeShipping
                        ? "You've unlocked FREE shipping!"
                        : `Spend $${remaining.toFixed(2)} more for free shipping`}
                </span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {isFreeShipping && (
                <p className="text-xs text-muted-foreground">
                    Free standard shipping will be applied at checkout.
                </p>
            )}
        </div>
    );
}
