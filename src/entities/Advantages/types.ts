import { ComponentType } from 'react';

import { IconProps } from '@/shared/icons';

export type Advantage = {
  icon: ComponentType<IconProps>;
  title: string;
  description?: string;
  index: string;
};
