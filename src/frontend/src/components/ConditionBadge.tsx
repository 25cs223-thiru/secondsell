import { ListingCondition } from "@/backend";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Condition } from "@/types";
import { AlertCircle, Sparkles, ThumbsUp, XCircle } from "lucide-react";

interface ConditionBadgeProps {
  condition: Condition;
  className?: string;
  size?: "sm" | "md";
  /** Show a tooltip with condition description on hover */
  showTooltip?: boolean;
}

interface ConditionConfig {
  label: string;
  description: string;
  className: string;
  dotClass: string;
  icon: React.ElementType;
}

const conditionConfig: Record<ListingCondition, ConditionConfig> = {
  [ListingCondition.new_]: {
    label: "New",
    description:
      "Never worn or used. Still has original tags, packaging, or in perfect flawless condition.",
    className:
      "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-400 dark:border-emerald-500/40",
    dotClass: "bg-emerald-500",
    icon: Sparkles,
  },
  [ListingCondition.likeNew]: {
    label: "Like New",
    description: "Barely used, no visible wear. Looks and functions like new.",
    className:
      "bg-teal-500/10 text-teal-700 border-teal-500/30 dark:text-teal-400 dark:border-teal-500/40",
    dotClass: "bg-teal-500",
    icon: Sparkles,
  },
  [ListingCondition.good]: {
    label: "Good",
    description:
      "Gently used with minor signs of wear. Fully functional and well cared for.",
    className:
      "bg-cyan-500/10 text-cyan-700 border-cyan-500/30 dark:text-cyan-400 dark:border-cyan-500/40",
    dotClass: "bg-cyan-500",
    icon: ThumbsUp,
  },
  [ListingCondition.fair]: {
    label: "Fair",
    description:
      "Noticeable wear, scratches, or fading. Works as intended but shows its age.",
    className:
      "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-400 dark:border-amber-500/40",
    dotClass: "bg-amber-500",
    icon: AlertCircle,
  },
  [ListingCondition.poor]: {
    label: "Poor",
    description:
      "Heavy wear, damage, or defects. Priced accordingly. Review photos carefully.",
    className:
      "bg-red-500/10 text-red-700 border-red-500/30 dark:text-red-400 dark:border-red-500/40",
    dotClass: "bg-red-500",
    icon: XCircle,
  },
};

function BadgeContent({
  condition,
  size,
  className,
}: {
  condition: Condition;
  size: "sm" | "md";
  className?: string;
}) {
  const config = conditionConfig[condition];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1",
        config.className,
        className,
      )}
    >
      <Icon
        className={cn("shrink-0", size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5")}
      />
      {config.label}
    </span>
  );
}

export function ConditionBadge({
  condition,
  className,
  size = "sm",
  showTooltip = false,
}: ConditionBadgeProps) {
  const config = conditionConfig[condition];

  if (!showTooltip) {
    return (
      <BadgeContent condition={condition} size={size} className={className} />
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="cursor-help focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
          aria-label={`Condition: ${config.label} — ${config.description}`}
        >
          <BadgeContent
            condition={condition}
            size={size}
            className={cn("cursor-help", className)}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-64 p-3 text-sm">
        <div className="flex items-start gap-2.5">
          <span
            className={cn(
              "w-2 h-2 rounded-full mt-1.5 shrink-0",
              config.dotClass,
            )}
          />
          <div className="min-w-0">
            <p className="font-semibold text-foreground mb-0.5">
              Condition: {config.label}
            </p>
            <p className="text-muted-foreground leading-relaxed text-xs">
              {config.description}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/** Returns just the dot color class for the given condition (for card accents) */
export function conditionDotClass(condition: Condition): string {
  return conditionConfig[condition].dotClass;
}

/** Returns the full config for use outside the badge component */
export function getConditionConfig(condition: Condition): ConditionConfig {
  return conditionConfig[condition];
}
