import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ドット影のボタン。ホバーで浮き上がり、押下で影の分だけ沈む
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border-2 border-border font-display whitespace-nowrap shadow-pixel-md transition-[translate,box-shadow,background-color] duration-150 ease-pixel outline-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel-lg focus-visible:shadow-focus active:translate-x-1 active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-48 disabled:shadow-none aria-invalid:border-destructive motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-transparent shadow-none hover:translate-0 hover:bg-accent hover:text-accent-foreground hover:shadow-none active:translate-0",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-inset",
        ghost:
          "border-transparent bg-transparent shadow-none hover:translate-0 hover:bg-accent hover:text-accent-foreground hover:shadow-none active:translate-0",
        link: "border-0 bg-transparent font-sans font-medium text-link underline underline-offset-4 shadow-none hover:translate-0 hover:decoration-2 hover:shadow-none active:translate-0",
      },
      size: {
        default: "h-11 px-5 text-base has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
        lg: "h-12 px-6 text-lg has-[>svg]:px-5",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
