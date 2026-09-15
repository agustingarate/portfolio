import Link from 'next/link';
import { BlogShell } from '@/components/blog/BlogShell';

export default function NotFound() {
  return (
    <BlogShell locale="en">
      <section style={{ maxWidth: 720, margin: '0 auto' }}>
        <p>404</p>
        <h1>This article is not available.</h1>
        <Link href="/en/blog">Back to blog</Link>
      </section>
    </BlogShell>
  );
}
