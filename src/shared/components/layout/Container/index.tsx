'use client';

import { ReactNode } from 'react';

import { buildContainerClasses } from './styles';

type Props = {
  /**
   * The HTML tag to render. Defaults to 'div'.
   */
  as?: 'div' | 'main' | 'section' | 'aside' | 'footer' | 'header';

  /**
   * The content to render inside the container.
   */
  children: ReactNode;

  /**
   * Additional class names to apply.
   */
  className?: string;
};

/**
 * A responsive container component with customizable tag and utility class support.
 * Uses a consistent set of max-width constraints and padding.
 *
 * @example
 * ```tsx
 * <Container as="section" className="bg-white">
 *   <p>Hello world</p>
 * </Container>
 * ```
 */
export const Container = ({ as: Tag = 'div', children, className }: Props) => {
  const classes = buildContainerClasses(className);

  return <Tag className={classes}>{children}</Tag>;
};
