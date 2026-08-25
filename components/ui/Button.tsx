import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";

const variantClass: Record<Variant, string> = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    tertiary: "btn btn-tertiary",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    children: ReactNode;
};

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
    return (
        <button className={`${variantClass[variant]} ${className}`.trim()} {...rest}>
            {children}
        </button>
    );
}

type LinkVariant = "primary" | "secondary" | "tertiary";

const linkVariantClass: Record<LinkVariant, string> = {
    primary: "link link-primary",
    secondary: "link link-secondary",
    tertiary: "link link-tertiary",
};

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: LinkVariant;
    children: ReactNode;
};

export function TextLink({ variant = "primary", className = "", children, ...rest }: TextLinkProps) {
    return (
        <a className={`${linkVariantClass[variant]} ${className}`.trim()} {...rest}>
            {children}
        </a>
    );
}