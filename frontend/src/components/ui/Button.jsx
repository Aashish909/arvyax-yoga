import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

const buttonVariants = {
  default: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
  outline: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
};

const Button = React.forwardRef(({ asChild = false, variant = "default", className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={clsx(buttonVariants[variant], className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button }; 