import { render, act, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useResizeObserver } from '../useResizeObserver';

// Mock ResizeObserver
class ResizeObserverMock {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  trigger(entries: ResizeObserverEntry[]) {
    this.callback(entries, this);
  }
}

describe('useResizeObserver', () => {
  let resizeObserverInstance: ResizeObserverMock;

  beforeEach(() => {
    global.ResizeObserver = vi.fn((callback: ResizeObserverCallback) => {
      resizeObserverInstance = new ResizeObserverMock(callback);
      return resizeObserverInstance;
    }) as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const TestComponent = () => {
    const { ref, size } = useResizeObserver();
    return (
      <div>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          data-testid="observed"
        />
        <span data-testid="size">{`${size.width}x${size.height}`}</span>
      </div>
    );
  };

  it('should initialize with default size', () => {
    const { getByTestId } = render(<TestComponent />);
    const size = getByTestId('size');
    expect(size.textContent).toBe('0x0');
  });

  it('should update size when ResizeObserver triggers', () => {
    const { getByTestId } = render(<TestComponent />);
    const observedEl = getByTestId('observed');
    act(() => {
      resizeObserverInstance.trigger([
        {
          target: observedEl,
          contentRect: { width: 123, height: 456 } as DOMRectReadOnly,
        } as unknown as ResizeObserverEntry,
      ]);
    });

    const size = getByTestId('size');
    expect(size.textContent).toBe('123x456');
  });
});
