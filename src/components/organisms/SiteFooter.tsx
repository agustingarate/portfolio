import type { SocialLink } from "@/content/portfolio.types";
import { Container } from "@/components/atoms/Container";
import styles from "./SiteFooter.module.css";
export function SiteFooter({ name, socials, copyright }: { name: string; socials: readonly SocialLink[]; copyright: string }) {
  return <footer className={styles.footer}><Container className={styles.inner}><a href="#inicio" className={styles.name}>{name}</a><div className={styles.links}>{socials.filter((s) => s.label !== "Descargar CV").map((social) => <a href={social.href} key={social.label}>{social.label}</a>)}</div><p>© {new Date().getFullYear()} {copyright}</p></Container></footer>;
}
