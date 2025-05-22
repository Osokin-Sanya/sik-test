import { ClassBuilder } from '@/shared/utils/classBuilder';

const LINK_BASE_CLASSES =
  'relative text-black font-carlito text-lg hover:text-main transition-all duration-300 ease-in-out before:content-[""] before:absolute before:left-0 before:-bottom-1 before:w-full before:h-[2px] before:bg-current before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-300';

export const getLinkStyles = (className?: string): string => {
  const builder = new ClassBuilder(LINK_BASE_CLASSES);

  builder.add(className);

  return builder.build();
};
