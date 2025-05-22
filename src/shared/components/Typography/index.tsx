import { ElementType, HTMLAttributes, ReactNode } from 'react';

import { typographyFactory } from './styles';
import { Variant } from './types';

type Props = {
  variant: Variant;
  children: ReactNode;
  component?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Typography = ({
  children,
  variant,
  className,
  component,
  ...props
}: Props) => {
  const { Tag, classes } = typographyFactory(variant, className);
  const Elem = (component || Tag) as ElementType;

  return (
    <Elem {...props} className={classes}>
      {children}
    </Elem>
  );
};
