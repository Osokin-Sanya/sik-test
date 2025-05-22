import { ClassBuilder } from '@/shared/utils/classBuilder';

export const buildContainerStyles = (isEnabled: boolean) => {
  return new ClassBuilder()
    .add(
      'w-[60] h-[122] items-start pt-3 !bg-black fixed right-[16] bottom-[0] rounded-b-none',
    )
    .toggle('translate-y-[100%]', !isEnabled)
    .build();
};
