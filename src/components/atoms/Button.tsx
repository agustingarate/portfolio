import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Common = { variant?: "primary" | "secondary"; wide?: boolean; className?: string; children: React.ReactNode };
type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export function Button(props: LinkProps | NativeProps) {
  const { variant = "primary", wide = false, className = "", children, ...rest } = props;
  const classes = `${styles.button} ${styles[variant]} ${wide ? styles.wide : ""} ${className}`;
  if ("href" in rest && rest.href) return <a {...rest} className={classes}>{children}</a>;
  return <button {...(rest as NativeProps)} className={classes}>{children}</button>;
}
