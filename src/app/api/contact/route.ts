import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 5_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  projectType?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
};

type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
};

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function json(body: Record<string, string>, status: number) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && new URL(origin).host !== host)
    return json({ error: 'Invalid origin' }, 403);

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  if (text(payload.website, 200)) return json({ ok: 'true' }, 200);

  const name = text(payload.name, MAX_NAME_LENGTH);
  const email = text(payload.email, 254).toLowerCase();
  const message = text(payload.message, MAX_MESSAGE_LENGTH);
  const projectType = text(payload.projectType, 80) || 'Consulta general';
  const turnstileToken = text(payload.turnstileToken, 2_048);
  if (!name || !message || !EMAIL_PATTERN.test(email))
    return json({ error: 'Invalid form data' }, 400);

  const { env } = await getCloudflareContext({ async: true });
  const {
    RESEND_API_KEY: apiKey,
    CONTACT_EMAIL: recipient,
    TURNSTILE_SECRET_KEY: turnstileSecret,
  } = env as CloudflareEnv & ContactEnv;
  if (!apiKey || !recipient || !turnstileSecret)
    return json({ error: 'Email service unavailable' }, 503);
  if (!turnstileToken) return json({ error: 'Verification required' }, 400);

  const verification = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
        remoteip: request.headers.get('cf-connecting-ip') ?? '',
      }),
    },
  );
  const verificationResult = (await verification.json()) as {
    success?: boolean;
  };
  if (!verificationResult.success)
    return json({ error: 'Verification failed' }, 403);

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio de Agustín <onboarding@resend.dev>',
      to: [recipient],
      reply_to: email,
      subject: `Nueva consulta: ${projectType}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTipo de proyecto: ${projectType}\n\nMensaje:\n${message}`,
    }),
  });

  if (!emailResponse.ok) {
    console.error('Contact email delivery failed', emailResponse.status);
    return json({ error: 'Email delivery failed' }, 502);
  }
  return json({ ok: 'true' }, 200);
}
