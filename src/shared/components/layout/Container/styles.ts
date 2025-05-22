import { ClassBuilder } from '@/shared/utils/classBuilder';

export const buildContainerClasses = (extra?: string) =>
  `${new ClassBuilder()
    .add('mx-auto px-3')
    .add('max-desktop:max-w-laptop-large')
    .add('max-laptop-large:max-w-laptop-small')
    .add('max-laptop-small:max-w-tablet-large')
    .add('max-tablet-large:max-w-tablet')
    .add('max-tablet:max-w-mobile')
    .add('min-laptop-large:max-w-desktop')
    .add(extra)
    .build()}`;
