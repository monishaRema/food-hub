import { HighlightCard } from "@/features/home/highlightCard";
import { BadgeCheck, Search, Truck } from "lucide-react";

const highlights = [
  {
    icon: Search,
    title: "Browse easily",
    description: "Search and filter meals across providers.",
  },
  {
    icon: Truck,
    title: "Cash on delivery",
    description: "Pay when your order arrives at your door.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted vendors",
    description: "Quality menus from verified providers.",
  },
];

export default function HighlightSection() {
  return (
 
        <div className=" grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <HighlightCard key={highlight.title} {...highlight} />
          ))}
        </div>

  );
}
