'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect whether the component has been hydrated on the client.
 *
 * Useful in Next.js or other SSR frameworks to avoid mismatches
 * between server-rendered and client-rendered content.
 *
 * @returns {boolean} `true` if running on the client after hydration, otherwise `false`.
 *
 * @example
 * const isClient = useHydration();
 * if (!isClient) return null; // prevent rendering until client-side
 */
export const useHydration = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
