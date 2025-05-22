import { ClassBuilder } from '@/shared/utils/classBuilder';

export const containerClasses = new ClassBuilder()
  .add(
    'bg-[url(/advantages/bg.png)] bg-no-repeat bg-cover overflow-hidden rounded-[12] h-[530] p-5 flex justify-between flex-col',
  )
  .build();

export const iconWrapperClasses = new ClassBuilder()
  .add(
    'mb-4 bg-main w-[60] h-[60] flex justify-center items-center rounded-md relative',
  )
  .add(
    'after:content-[""] after:w-[60] after:h-[60] after:rotate-[16deg] after:absolute after:bg-main  z-1 after:z-[-1] after:opacity-20 after:rounded-md',
  )
  .build();

export const buildDigitClasses = (extra: string) => {
  return new ClassBuilder()
    .add(
      'font-bold font-carlito text-[150px] leading-none bg-clip-text text-transparent',
    )
    .add(extra)
    .build();
};
