import { ClassBuilder } from '@/shared/utils/classBuilder';

export const arrowStyles = new ClassBuilder()
  .add('absolute top-[16] right-[16] opacity-0')
  .add('group-hover:opacity-100 transition-opacity duration-200')
  .build();

export const linkedInStyles = new ClassBuilder()
  .add(
    'absolute bottom-[0] left-0 w-[64] h-[64] bg-main flex justify-center items-center rounded-tr-md',
  )
  .build();

export const imageContainerStyles = new ClassBuilder()
  .add('relative mb-4 rounded-sm overflow-hidden group')
  .build();
