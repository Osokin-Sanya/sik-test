import { Api } from 'grammy';
import { describe, it, expect, vi } from 'vitest';
import { ZodError } from 'zod';

import { sendMessage } from '../sendMessage';

vi.mock('grammy');

describe('sendMessage', () => {
  it('throws error if TELEGRAM_API_KEY is not provided', async () => {
    process.env.TELEGRAM_CHAT_ID = '123456';
    delete process.env.TELEGRAM_API_KEY;

    await expect(sendMessage('test')).rejects.toThrow(
      'TELEGRAM_API_KEY is not provided',
    );
  });

  it('throws error if TELEGRAM_CHAT_ID is not provided', async () => {
    process.env.TELEGRAM_API_KEY = 'test-api-key';
    delete process.env.TELEGRAM_CHAT_ID;

    await expect(sendMessage('test')).rejects.toThrow(
      'TELEGRAM_CHAT_ID is not provided',
    );
  });

  it('sends message when input is valid', async () => {
    process.env.TELEGRAM_API_KEY = 'test-api-key';
    process.env.TELEGRAM_CHAT_ID = '123456';

    const mockSendMessage = vi.fn();
    vi.spyOn(Api.prototype, 'sendMessage').mockImplementation(mockSendMessage);

    await sendMessage('Hello, world');

    expect(mockSendMessage).toHaveBeenCalledWith('123456', 'Hello, world');
  });

  it('throws error if string is empty', async () => {
    process.env.TELEGRAM_API_KEY = 'test-api-key';
    process.env.TELEGRAM_CHAT_ID = '123456';

    const mockSendMessage = vi.fn();
    vi.spyOn(Api.prototype, 'sendMessage').mockImplementation(mockSendMessage);

    await expect(sendMessage('')).rejects.toThrowError(ZodError);
  });
});
