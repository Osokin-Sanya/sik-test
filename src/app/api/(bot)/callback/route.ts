import { z, ZodError } from 'zod';

import { sendMessage } from '@/server/lib/telegram';

/**
 * Handles a POST request to send a Telegram message with the user's phone number.
 *
 * Expects a JSON body with the following shape:
 * {
 *   phone: string // Must be a valid E.164 phone number (e.g., "+1234567890")
 * }
 *
 * @param {Request} req - The incoming HTTP request containing JSON with a phone number.
 *
 * @returns {Promise<Response>} 200 if sent successfully, 400 if validation fails, 500 for internal errors.
 *
 * @example
 * fetch('/api/send-phone', {
 *   method: 'POST',
 *   body: JSON.stringify({ phone: '+1234567890' })
 * });
 */
export const POST = async (req: Request): Promise<Response> => {
  try {
    const schema = z.object({
      phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    });

    const data: z.infer<typeof schema> = await req.json();

    schema.parse(data);

    const message = `Клиент хочет чтобы ему перезвонили: ${data.phone}`;

    await sendMessage(message);

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 400 });
    } else {
      console.error((error as Error).message);
      return new Response(null, { status: 500 });
    }
  }
};
