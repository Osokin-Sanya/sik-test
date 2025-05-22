import { ClassBuilder } from '@/shared/utils/classBuilder';

type InputStylesProps = {
  hasIcon: boolean;
  isInvalid: boolean;
};

export const buildInputStyles = (
  { hasIcon, isInvalid }: InputStylesProps,
  extra?: string,
) => {
  return new ClassBuilder()
    .add(
      'bg-white/12 rounded-xs px-4 py-3 h-[60] text-light-gray font-natoSans text-lg w-full focus:border-main outline-none border-1 border-transparent transition-colors',
    )
    .add('focus:border-1 focus:border-solid focus:border-main')
    .toggle('pl-[54]', hasIcon)
    .toggle('!border-invalid', isInvalid)
    .add(extra)
    .build();
};

export const buildIconStyles = () => {
  return new ClassBuilder()
    .add(
      'absolute h-full  left-4 overflow-hidden pointer-events-none w-[20] flex items-center justify-center',
    )
    .build();
};

export const buildPlaceholderStyles = (hasIcon: boolean) => {
  return new ClassBuilder()
    .add(
      'absolute top-[50%] translate-y-[-50%]  pointer-events-none text-light-gray',
    )
    .toggle('left-[calc(var(--spacing-4)+2px)]', !hasIcon)
    .toggle('left-[56]', hasIcon)
    .build();
};
