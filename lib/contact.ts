import { isValidEmail } from './newsletter';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ContactSubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Secondary contact channel (WhatsApp is primary). No email service is
 * wired in yet — this simulates a network call. To connect a real
 * provider (EmailJS, Resend, etc.), this is the only function that
 * needs to change.
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactSubmitResult> {
  if (!data.name.trim()) return { ok: false, error: 'Enter your name.' };
  if (!isValidEmail(data.email)) return { ok: false, error: 'Enter a valid email address.' };
  if (!data.message.trim()) return { ok: false, error: 'Enter a message.' };

  try {
    // --- Integration point ---
    // Replace this block with a real call, e.g.:
    //   await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { ok: true };
  } catch {
    return { ok: false, error: 'Something went wrong. Try again.' };
  }
}
