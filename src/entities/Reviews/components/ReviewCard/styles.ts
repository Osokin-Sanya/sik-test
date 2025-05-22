import { ClassBuilder } from '@/shared/utils/classBuilder';

export const containerClasses = new ClassBuilder()
  .add(
    'bg-[url(/reviews/bg.png)] p-5 bg-no-repeat bg-cover overflow-hidden rounded-[12]',
  )
  .build();

export const topNesterContainerClasses = new ClassBuilder()
  .add('flex justify-between  items-center mb-3')
  .build();

export const middleNesterContainerClasses = new ClassBuilder()
  .add('flex items-center mb-4')
  .build();
