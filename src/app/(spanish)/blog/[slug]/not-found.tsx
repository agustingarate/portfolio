import Link from 'next/link';
import { BlogShell } from '@/components/blog/BlogShell';

export default function NotFound() {
  return (
    <BlogShell locale="es">
      <section style={{ maxWidth: 720, margin: '0 auto' }}>
        <p>404</p>
        <h1>Este artículo no está disponible.</h1>
        <Link href="/blog">Volver al blog</Link>
      </section>
    </BlogShell>
  );
}
