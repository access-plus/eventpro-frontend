import { cn } from "@/lib/utils";
import { Music, Trophy, Monitor, Briefcase, Palette, UtensilsCrossed, Heart, GraduationCap, Sparkles, MoreHorizontal, type LucideIcon } from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Music: Music,
  Sports: Trophy,
  Technology: Monitor,
  Business: Briefcase,
  Arts: Palette,
  "Food & Drink": UtensilsCrossed,
  "Health & Wellness": Heart,
  Education: GraduationCap,
  Entertainment: Sparkles,
  Other: MoreHorizontal,
};

const EVENT_CATEGORIES = [
  "Music",
  "Sports",
  "Technology",
  "Business",
  "Arts",
  "Food & Drink",
  "Health & Wellness",
  "Education",
  "Entertainment",
  "Other",
];

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  className?: string;
}

export const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
          selectedCategory === null
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        All Events
      </button>
      {EVENT_CATEGORIES.map((category) => {
        const Icon = CATEGORY_ICONS[category];
        const isSelected = selectedCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(isSelected ? null : category)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              isSelected
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {category}
          </button>
        );
      })}
    </div>
  );
};
