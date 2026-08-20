/**
 * newsletter.ts — single source of truth for email signup.
 *
 * Both the inline "Stay Updated" section and the engagement popup
 * call `subscribeEmail()`. There is no real email service wired in
 * yet — this simulates a network call so the full success/error UI
 * can be built and tested end-to-end. To connect a real provider
 * (EmailJS, Mailchimp, Klaviyo, etc.), this is the ONLY function
 * that needs to change — no component touches the network directly.
 */

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export type SubscribeResult = { ok: true } | { ok: false; error: string };

export async function subscribeEmail(email: string): Promise<SubscribeResult> {
  if (!isValidEmail(email)) {
    return { ok: false, error: 'Enter a valid email address.' };
  }

  try {
    // --- Integration point ---
    // Replace this block with a real call, e.g.:
    //   await emailjs.send(SERVICE_ID, TEMPLATE_ID, { email }, PUBLIC_KEY);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { ok: true };
  } catch {
    return { ok: false, error: 'Something went wrong. Try again.' };
  }
}

export const NEWSLETTER_SUBSCRIBED_KEY = 'newsletter_subscribed';
export const NEWSLETTER_POPUP_DISMISSED_KEY = 'newsletter_popup_dismissed';

export function hasSubscribed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(NEWSLETTER_SUBSCRIBED_KEY) === 'true';
}

export function markSubscribed(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, 'true');
}

export function hasDismissedPopupThisSession(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(NEWSLETTER_POPUP_DISMISSED_KEY) === 'true';
}

export function markPopupDismissedThisSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(NEWSLETTER_POPUP_DISMISSED_KEY, 'true');
}
