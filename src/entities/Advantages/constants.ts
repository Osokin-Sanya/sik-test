import { WebSiteIcon, BrainIcon, RocketIcon, IdeaIcon } from '@/shared/icons';

import { Advantage } from './types';

export const ADVANTAGES: Advantage[] = [
  {
    icon: WebSiteIcon,
    title: 'Розробляємо сайти, що вирішують бізнес-задачі',
    description: 'та приносять результат',
    index: '01',
  },
  {
    icon: BrainIcon,
    title: 'Допомагаємо віднайти додаткові рішення вашого бізнесу',
    index: '02',
  },
  {
    icon: RocketIcon,
    title: 'Пропонуємо рішення під ключ',
    description: 'від маркетингового аналізу до запуску',
    index: '03',
  },
  {
    icon: IdeaIcon,
    title: 'Персональний підхід',
    description: 'створюємо рішення під ваш запит',
    index: '04',
  },
];
