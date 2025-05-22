import { ClassBuilder } from '@/shared/utils/classBuilder';

const ICON_BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center bg-main text-black cursor-pointer font-carlito p-3';
const ICON_BUTTON_SHAPE_CLASSES = {
  'round-xs': 'rounded-xs',
  'round-md': 'rounded-md',
};
const ICON_BUTTON_HOVER_CLASSES =
  'transition-transform duration-200 hover:scale-105 hover:bg-amber-300';
const ICON_BUTTON_FOCUS_CLASSES =
  'focus:outline-none focus:ring-2 focus:ring-lin_gold';
const ICON_BUTTON_DISABLED_CLASSES =
  'disabled:bg-light-gray_secondary disabled:cursor-not-allowed';

interface BuildButtonClassesParams {
  shape: 'round-xs' | 'round-md';
  className?: string;
}

export function buildIconButtonClasses(
  params: BuildButtonClassesParams,
): string {
  const { shape, className } = params;
  const builder = new ClassBuilder();

  builder
    .add(ICON_BUTTON_BASE_CLASSES)
    .add(ICON_BUTTON_SHAPE_CLASSES[shape])
    .add(ICON_BUTTON_HOVER_CLASSES)
    .add(ICON_BUTTON_FOCUS_CLASSES)
    .add(ICON_BUTTON_DISABLED_CLASSES)
    .add(className);
  return builder.build();
}
