import 'server-only';

import { Api } from 'grammy';
import { z } from 'zod';

/**
 * Sends a message to a Telegram chat using the Bot API.
 *
 * @param {string} message - The message text to send. Must be a non-empty string.
 *
 * @throws {Error} If the TELEGRAM_API_KEY or TELEGRAM_CHAT_ID environment variable is missing.
 * @throws {ZodError} If the message is an empty string (failing validation).
 *
 * @example
 * await sendMessage("Hello, world!");
 */
export async function sendMessage(message: string) {
  const apiToken = process.env.TELEGRAM_API_KEY;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!apiToken) throw new Error('TELEGRAM_API_KEY is not provided');
  if (!chatId) throw new Error('TELEGRAM_CHAT_ID is not provided');

  const schema = z.string().min(1);

  schema.parse(message);

  const api = new Api(apiToken);

  await api.sendMessage(chatId, message);
}
