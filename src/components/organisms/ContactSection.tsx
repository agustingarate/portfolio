"use client";
import { useState } from "react";
import type { ProjectType, SocialLink } from "@/content/portfolio.types";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import styles from "./ContactSection.module.css";
export function ContactSection({ title, description, email, projectTypes, socials }: { title: string; description: string; email: string; projectTypes: readonly ProjectType[]; socials: readonly SocialLink[] }) {
  const [status, setStatus] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Consulta de proyecto: ${form.get("project_type")}`);
    const body = encodeURIComponent(`Nombre: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`);
    setStatus("Abriendo tu aplicación de correo…");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };
  return <section id="contacto" className={styles.section}><Container className={styles.container}><div className={styles.grid}><div><h2>{title}</h2><p className={styles.description}>{description}</p><div className={styles.socials}>{socials.map((social) => <a key={social.label} href={social.href}><Icon name={social.icon}/>{social.label}</a>)}</div></div>
    <form onSubmit={submit}><fieldset><legend>Tipo de Proyecto</legend><div className={styles.types}>{projectTypes.map((type, index) => <label key={type.value}><input type="radio" name="project_type" value={type.value} defaultChecked={index === 0}/><span>{type.label}</span></label>)}</div></fieldset>
      <label className="sr-only" htmlFor="name">Nombre</label><input required id="name" name="name" placeholder="Tu Nombre" autoComplete="name"/>
      <label className="sr-only" htmlFor="email">Email</label><input required id="email" name="email" type="email" placeholder="Tu Email" autoComplete="email"/>
      <label className="sr-only" htmlFor="message">Mensaje</label><textarea required id="message" name="message" rows={4} placeholder="Cuéntame un poco más sobre el contexto…"/>
      <Button type="submit" wide>Enviar Mensaje</Button><p className={styles.status} aria-live="polite">{status}</p>
    </form></div></Container></section>;
}
