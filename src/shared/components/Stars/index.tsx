'use client';

import { useGetCssVariable } from '@/shared/hooks';
import { StarIcon } from '@/shared/icons/StarIcon';

type Props = {
  count: number;
  active: number;
};

export const Stars = ({ count, active }: Props) => {
  const activeColor = useGetCssVariable('--color-main', 'white');
  const inactiveColor = useGetCssVariable('--color-light-gray', 'black');

  return (
    <div className={'flex items-center'} aria-label={`${active} stars`}>
      {new Array(count).fill(null).map((_, index) => {
        const isActive = active > index;
        const color = isActive ? activeColor : inactiveColor;

        return (
          <div className={'ml-[2]'} key={index}>
            <StarIcon size={20} color={color} />
          </div>
        );
      })}
    </div>
  );
};
