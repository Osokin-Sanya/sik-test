import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useGetCssVariable } from '../useGetCssVariable';

const setCssVariable = (name: string, value: string) => {
  document.body.style.setProperty(name, value);
};

describe('useGetCssVariable', () => {
  it('returns the default value initially', () => {
    const { result } = renderHook(() =>
      useGetCssVariable('--non-existent-var', 'fallback'),
    );
    expect(result.current.trim()).toBe('fallback');
  });

  it('returns the value of the CSS variable if it exists', () => {
    setCssVariable('--test-color', '#ff0000');

    const { result } = renderHook(() =>
      useGetCssVariable('--test-color', 'black'),
    );

    expect(result.current.trim()).toBe('#ff0000');
  });

  it('updates when the cssVar dependency changes', () => {
    setCssVariable('--color-one', 'red');
    setCssVariable('--color-two', 'blue');

    const { result, rerender } = renderHook(
      ({ cssVar }) => useGetCssVariable(cssVar, 'black'),
      {
        initialProps: { cssVar: '--color-one' },
      },
    );

    expect(result.current.trim()).toBe('red');

    rerender({ cssVar: '--color-two' });
    expect(result.current.trim()).toBe('blue');
  });
});
