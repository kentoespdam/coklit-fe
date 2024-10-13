import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React, { type LinkHTMLAttributes } from "react";

interface LinkButtonProps extends LinkHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof buttonVariants> {
    href: string;
    asChild?: boolean;
}
const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    ({ href, title, asChild, variant, className, size, ...props }, ref) => {
        const Comp = asChild ? Slot : Link
        return (
            <Comp
                href={href}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {title}
            </Comp>
        );
    })

LinkButton.displayName = "LinkButton"

export default LinkButton;