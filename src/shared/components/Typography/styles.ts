import { ClassBuilder } from '@/shared/utils/classBuilder';

import { Variant } from './types';

export const typographyFactory = (
  variant: Variant,
  extra?: string,
): { classes: string; Tag: string } => {
  switch (variant) {
    case 'h1':
      return {
        classes: new ClassBuilder()
          .add('text-9xl font-bold font-carlito')
          .add(extra)
          .build(),
        Tag: 'h1',
      };
    case 'h2':
      return {
        classes: new ClassBuilder()
          .add('text-7xl font-bold font-carlito')
          .add(extra)
          .build(),
        Tag: 'h2',
      };
    case 'h3':
      return {
        classes: new ClassBuilder()
          .add('text-4xl font-bold font-carlito')
          .add(extra)
          .build(),
        Tag: 'h3',
      };
    case 'body':
      return {
        classes: new ClassBuilder()
          .add('text-lg font-regular font-natoSans')
          .add(extra)
          .build(),
        Tag: 'p',
      };
    default:
      return {
        classes: new ClassBuilder()
          .add('text-lg font-regular font-natoSans')
          .add(extra)
          .build(),
        Tag: 'p',
      };
  }
};
