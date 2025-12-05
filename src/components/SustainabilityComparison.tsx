import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SustainabilityComparison({ className }: { className?: string }) {
    const features = [
        {
            name: "Materials",
            us: "100% Recycled & Sustainable",
            them: "Virgin Paper & Plastic",
        },
        {
            name: "Inks",
            us: "Soy-based & Non-toxic",
            them: "Petroleum-based",
        },
        {
            name: "Packaging",
            us: "Plastic-free & Compostable",
            them: "Single-use Plastic",
        },
        {
            name: "Lifespan",
            us: "Durable & Long-lasting",
            them: "Disposable",
        },
        {
            name: "Carbon Footprint",
            us: "Carbon Neutral Certified",
            them: "High Emissions",
        },
    ];

    return (
        <div className={cn("w-full overflow-hidden rounded-xl border bg-background", className)}>
            <div className="grid grid-cols-3 bg-muted/50 p-4 text-sm font-medium text-muted-foreground">
                <div>Feature</div>
                <div className="text-center font-bold text-foreground">Aesthesionery</div>
                <div className="text-center">Traditional Brands</div>
            </div>
            <div className="divide-y">
                {features.map((feature) => (
                    <div key={feature.name} className="grid grid-cols-3 items-center p-4 text-sm">
                        <div className="font-medium">{feature.name}</div>
                        <div className="flex flex-col items-center justify-center gap-1 text-center font-medium text-green-600">
                            <Check className="h-5 w-5" />
                            <span>{feature.us}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 text-center text-muted-foreground">
                            <X className="h-5 w-5" />
                            <span>{feature.them}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
