import { Resend } from "resend";

import { claimEmailSend } from "../db/repo";
import { env, capabilities } from "../env";
import type { Order } from "../db/schema";
import { orderConfirmation, shippingNotice, type RenderedEmail } from "./templates";

/**
 * Email sending.
 *
 * Every send is claimed against a dedupe key first, so a Stripe webhook retry
 * or a re-run of a lifecycle job cannot mail the same person twice. The claim
 * happens *before* the provider call: sending twice is worse than not sending,
 * because a duplicate receipt reads as a duplicate charge.
 *
 * Without RESEND_API_KEY the message is logged instead of sent, so the flow is
 * exercisable with no account.
 */

let client: Resend | null | undefined;

function resend(): Resend | null {
  if (client === undefined) {
    client = env.resendApiKey ? new Resend(env.resendApiKey) : null;
  }
  return client;
}

export interface SendResult {
  sent: boolean;
  skipped?: "duplicate" | "unconfigured";
  error?: string;
}

async function deliver(
  to: string,
  dedupeKey: string,
  template: string,
  email: RenderedEmail,
): Promise<SendResult> {
  const first = await claimEmailSend(dedupeKey, to, template);
  if (!first) return { sent: false, skipped: "duplicate" };

  const api = resend();
  if (!api) {
    console.info(
      `[email:unconfigured] would send "${email.subject}" to ${to}\n` +
        `${email.text.slice(0, 400)}\n---`,
    );
    return { sent: false, skipped: "unconfigured" };
  }

  try {
    const { error } = await api.emails.send({
      from: env.emailFrom,
      to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      replyTo: env.supportEmail,
    });
    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (error) {
    return { sent: false, error: error instanceof Error ? error.message : "unknown" };
  }
}

export function sendOrderConfirmation(order: Order): Promise<SendResult> {
  return deliver(
    order.email,
    `order_confirmation:${order.reference}`,
    "order_confirmation",
    orderConfirmation(order),
  );
}

export function sendShippingNotice(order: Order): Promise<SendResult> {
  return deliver(
    order.email,
    `shipping_notice:${order.reference}`,
    "shipping_notice",
    shippingNotice(order),
  );
}

export const emailLive = capabilities.email;
