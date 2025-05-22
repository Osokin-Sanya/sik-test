import { RefObject, useLayoutEffect, useRef, useState } from 'react';

type ResizeSize = {
  width: number;
  height: number;
};

/**
 * Custom hook that uses `ResizeObserver` to track the size of a DOM element.
 *
 * Returns a `ref` to be attached to the target element and its current `width` and `height`.
 * Updates automatically when the element resizes.
 *
 * @returns {{
 *   ref: RefObject<HTMLElement | null>,
 *   size: { width: number, height: number }
 * }} Object containing the `ref` to be assigned and the current size.
 *
 * @example
 * const { ref, size } = useResizeObserver();
 *
 * return (
 *   <div ref={ref}>
 *     Width: {size.width}, Height: {size.height}
 *   </div>
 * );
 */
export const useResizeObserver = (): {
  ref: RefObject<HTMLElement | null>;
  size: { width: number; height: number };
} => {
  const ref = useRef<HTMLElement | null>(null);
  const [size, setSize] = useState<ResizeSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, size };
};
