'use client';

import CountUp from 'react-countup';

import { useHydration } from '@/shared/hooks';

type Props = {
  start: number;
  end: number;
  suffix?: string;
};

/**
 * AnimatedCounter — a component that animates numerical values using `react-countup`.
 *
 * This is a client-only component. During server-side rendering (SSR) or static site generation (SSG),
 * it renders the final number statically. After hydration on the client, it animates from `start` to `end`.
 * Optionally displays a suffix (e.g., `%`, `k`, `+`) next to the number.
 *
 * @component
 * @example
 * ```tsx
 * <AnimatedCounter start={0} end={100} suffix="%" />
 * ```
 *
 * @param {number} start - The starting value for the animation.
 * @param {number} end - The final value to display.
 * @param {string} [suffix] - Optional suffix to display after the number (e.g., `%`, `+`).
 * @returns {JSX.Element} A span element with either static or animated content based on hydration.
 */
export const AnimatedCounter = ({ start, end, suffix }: Props) => {
  const isClient = useHydration();

  if (!isClient) {
    return (
      <span>
        {end}
        {suffix}
      </span>
    );
  }

  return (
    <CountUp
      delay={5}
      startOnMount={false}
      scrollSpyOnce
      enableScrollSpy
      end={end}
      start={start}
      suffix={suffix}
    >
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  );
};
