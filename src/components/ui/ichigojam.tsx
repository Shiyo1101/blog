import { cn } from "@/lib/utils";

type IJTypographyProps = {
  children: React.ReactNode;
  color?: "default" | "primary" | "secondary";
  fontSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
};

const IJTypography = ({
  children,
  color = "default",
  fontSize = "base",
}: IJTypographyProps) => {
  const textSize = (() => {
    switch (fontSize) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      case "3xl":
        return "text-3xl";
      case "4xl":
        return "text-4xl";
      case "5xl":
        return "text-5xl";
      case "6xl":
        return "text-6xl";
      case "7xl":
        return "text-7xl";
      case "8xl":
        return "text-8xl";
      case "9xl":
        return "text-9xl";
      default:
        return "text-base";
    }
  })();

  const textColor = (() => {
    switch (color) {
      case "default":
        return "text-default";
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      default:
        return "text-default";
    }
  })();

  return (
    <div className={cn(textColor, textSize, "font-ichigojam")}>{children}</div>
  );
};

export { IJTypography };
