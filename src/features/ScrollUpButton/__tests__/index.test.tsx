import { render, fireEvent, act, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ScrollUpButton } from '../index';

const scrollToMock = vi.fn();

describe('ScrollUpButton', () => {
  beforeEach(() => {
    window.scrollTo = scrollToMock;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should be hidden initially', () => {
    const { getByRole } = render(<ScrollUpButton />);
    const button = getByRole('button');
    expect(button).toBeTruthy();
    expect(button.className).toContain('translate-y-[100%]');
  });

  it('should show the button when scrolling past half viewport height', () => {
    const { getByRole } = render(<ScrollUpButton />);
    const button = getByRole('button');

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        writable: true,
        value: 400,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(button).toBeTruthy();
    expect(button?.className).not.toContain('translate-y-[100%]');
  });

  it('should not show the button when scrolling past half viewport height', () => {
    const { getByRole } = render(<ScrollUpButton />);
    const button = getByRole('button');

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        writable: true,
        value: 300,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(button).toBeTruthy();
    expect(button?.className).toContain('translate-y-[100%]');
  });

  it('should call window.scrollTo with top: 0 and smooth behavior on click', () => {
    render(<ScrollUpButton />);

    const button = document.body.querySelector('button');
    expect(button).toBeTruthy();

    fireEvent.click(button!);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
