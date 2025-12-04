import { Recycle, FlaskConical, Cloud, Leaf } from "lucide-react";

export function SustainabilityIcons() {
    const features = [
        {
            icon: Recycle,
            label: "100% Recyclable",
            description: "All materials can be recycled"
        },
        {
            icon: FlaskConical,
            label: "Chemical Free",
            description: "No harmful chemicals used"
        },
        {
            icon: Cloud,
            label: "CO₂ Neutral",
            description: "Carbon neutral production",
            hasOverlay: true
        },
        {
            icon: Leaf,
            label: "Sustainable",
            description: "Eco-friendly materials"
        }
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-3">Our Commitment</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Every product is crafted with care for our planet
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:scale-105 group"
                    >
                        <div className="relative flex items-center justify-center">
                            <feature.icon
                                className="w-12 h-12 md:w-14 md:h-14 text-[#8B7355] group-hover:text-[#6B5335] transition-colors"
                                strokeWidth={1.5}
                            />
                            {feature.hasOverlay && (
                                <span className="absolute text-[10px] md:text-xs font-bold pt-1 text-[#8B7355] group-hover:text-[#6B5335] transition-colors">
                                    CO₂
                                </span>
                            )}
                        </div>
                        <div className="text-center space-y-1">
                            <p className="font-medium text-sm md:text-base text-foreground">
                                {feature.label}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground hidden md:block">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
