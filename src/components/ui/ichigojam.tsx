import { cn } from "@/lib/utils";

type IJTypographyProps = {
  children: React.ReactNode;
  color?: "default" | "primary" | "secondary";
  fontWeight?:
    | "black"
    | "extrabold"
    | "bold"
    | "semibold"
    | "medium"
    | "normal"
    | "light"
    | "extralight"
    | "thin";
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
  fontWeight = "normal",
  fontSize = "base",
}: IJTypographyProps) => {
  return (
    <div
      className={cn(
        `text-${color} font-${fontWeight} text-${fontSize}`,
        "font-ichigojam",
      )}
    >
      {children}
    </div>
  );
};

export { IJTypography };
