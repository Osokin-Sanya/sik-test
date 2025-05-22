import { ClassBuilder } from '@/shared/utils/classBuilder';

export const buildInputStyles = (isInvalid: boolean, extra?: string) => {
  return new ClassBuilder()
    .add(
      'bg-white/12 rounded-xs px-4 py-4 text-white/50 font-natoSans text-lg w-full focus:border-main outline-none border-1 border-transparent transition-colors resize-none',
    )
    .add('focus:border-1 focus:border-solid focus:border-main')
    .toggle('!border-invalid', isInvalid)
    .add(extra)
    .build();
};

export const buildPlaceholderStyles = () => {
  return new ClassBuilder()
    .add('absolute top-4  pointer-events-none text-white/50')
    .add('left-[calc(var(--spacing-4)+2px)]')
    .build();
};
