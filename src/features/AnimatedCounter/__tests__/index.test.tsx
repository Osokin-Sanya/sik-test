import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { useHydration } from '@/shared/hooks/useHydration';

import { AnimatedCounter } from '../index';

vi.mock('react-countup', () => ({
  default: ({ children }: any) => {
    return children({ countUpRef: vi.fn() });
  },
}));

vi.mock('@/shared/hooks/useHydration', () => ({
  useHydration: vi.fn(),
}));

describe('AnimatedCounter', () => {
  const baseProps = {
    start: 0,
    end: 100,
    suffix: '+',
  };

  afterEach(() => {
    cleanup();
  });

  it('renders fallback static value before hydration', () => {
    (useHydration as any).mockReturnValue(false);

    render(<AnimatedCounter {...baseProps} />);
    expect(screen.getByText('100+')).toBeInTheDocument();
  });

  it('renders CountUp after hydration', () => {
    (useHydration as any).mockReturnValue(true);

    render(<AnimatedCounter {...baseProps} />);
    const span = screen.getByText((_, el) => el?.tagName === 'SPAN');
    expect(span).toBeInTheDocument();
  });

  it('renders correctly without suffix', () => {
    (useHydration as any).mockReturnValue(false);

    render(<AnimatedCounter start={0} end={500} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });
});
