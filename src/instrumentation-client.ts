import posthog from 'posthog-js';

const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (apiKey) {
  try {
    posthog.init(apiKey, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      capture_pageview: 'history_change',
      capture_pageleave: 'if_capture_pageview',
    });
  } catch {
    // Analytics must never prevent the portfolio from becoming interactive.
  }
}
