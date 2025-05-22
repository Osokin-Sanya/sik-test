import { z, ZodError } from 'zod';

import { sendMessage } from '@/server/lib/telegram';

/**
 * Handles a POST request to submit a client application and send it via Telegram.
 *
 * Expects a JSON payload with the following fields:
 * - name: string (required, min 1 character)
 * - phone: string (required, E.164 format, e.g. "+1234567890")
 * - email: string (required, valid email address)
 * - service: string (required)
 * - description: string (optional)
 *
 * Constructs a formatted message and sends it via the Telegram bot.
 *
 * @param {Request} req - The incoming HTTP request containing JSON application data.
 *
 * @returns {Promise<Response>}
 * - 200: if the message was sent successfully,
 * - 400: if validation fails (ZodError),
 * - 500: for unexpected errors (e.g., environment/config issues).
 *
 * @example
 * fetch('/api/send-application', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     name: "Иван",
 *     phone: "+1234567890",
 *     email: "ivan@example.com",
 *     service: "Консультация",
 *     description: "Хотел бы обсудить проект"
 *   })
 * });
 */
export const POST = async (req: Request): Promise<Response> => {
  try {
    const schema = z.object({
      name: z.string().min(1, 'The length has to be more than 1'),
      phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
      email: z.string().email(),
      service: z.string(),
      description: z.string().optional(),
    });

    const data: z.infer<typeof schema> = await req.json();

    schema.parse(data);

    const buildMessage = () => {
      let message = `Клиент подал заявку:\nИмя - ${data.name}\nТелефон - ${data.phone}\nПочта - ${data.email}\nУслуга - ${data.service}`;

      if (data.description) {
        message += `\nОписание - ${data.description}`;
      }

      return message;
    };

    await sendMessage(buildMessage());

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
