"use client";
import { useState } from "react";
import Script from "next/script";
import type { ProjectType, SocialLink } from "@/content/portfolio.types";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import styles from "./ContactSection.module.css";
export function ContactSection({ title, description, projectTypes, socials, turnstileSiteKey }: { title: string; description: string; projectTypes: readonly ProjectType[]; socials: readonly SocialLink[]; turnstileSiteKey: string }) {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setIsSubmitting(true); setStatus("Enviando mensaje…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"), email: form.get("email"), message: form.get("message"),
          projectType: form.get("project_type"), website: form.get("website"), turnstileToken: form.get("cf-turnstile-response"),
        }),
      });
      if (!response.ok) throw new Error("contact-request-failed");
      formElement.reset();
      setStatus("¡Gracias! Tu mensaje fue enviado correctamente.");
    } catch {
      setStatus("No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contacto" className={styles.section}><Script id="turnstile-api" src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/><Container className={styles.container}><div className={styles.grid}><div><h2>{title}</h2><p className={styles.description}>{description}</p><div className={styles.socials}>{socials.map((social) => <a key={social.label} href={social.href}><Icon name={social.icon}/>{social.label}</a>)}</div></div>
    <form onSubmit={submit}><fieldset><legend>Tipo de Proyecto</legend><div className={styles.types}>{projectTypes.map((type, index) => <label key={type.value}><input type="radio" name="project_type" value={type.value} defaultChecked={index === 0}/><span>{type.label}</span></label>)}</div></fieldset>
      <label className="sr-only" htmlFor="name">Nombre</label><input required id="name" name="name" placeholder="Tu Nombre" autoComplete="name"/>
      <label className="sr-only" htmlFor="email">Email</label><input required id="email" name="email" type="email" placeholder="Tu Email" autoComplete="email"/>
      <label className="sr-only" htmlFor="message">Mensaje</label><textarea required id="message" name="message" rows={4} placeholder="Cuéntame un poco más sobre el contexto…"/>
      <label className={styles.honeypot} htmlFor="website">Sitio web</label><input className={styles.honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off"/>
      <div className={`${styles.turnstile} cf-turnstile`} data-sitekey={turnstileSiteKey} data-theme="light" data-language="es"/>
      <Button type="submit" wide disabled={isSubmitting}>{isSubmitting ? "Enviando…" : "Enviar Mensaje"}</Button><p className={styles.status} aria-live="polite">{status}</p>
    </form></div></Container></section>;
}
