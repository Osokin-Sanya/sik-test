import { JSX } from 'react';

import { Typography } from '@/shared/components';

import { Advantage } from '../../types';

import styles from './style.module.css';
import {
  buildDigitClasses,
  containerClasses,
  iconWrapperClasses,
} from './styles';

/**
 * `AdvantageCard` is a presentational component used to display an individual advantage
 * or feature with an icon, title, description, and an index number.
 *
 * It uses custom styles and the `Typography` component for consistent text formatting.
 *
 * @component
 *
 * @param {Object} props - The props for the component.
 * @param {React.ElementType} props.icon - A React component representing an icon, expected to accept a `color` prop.
 * @param {string} props.title - The title text displayed as the heading of the card.
 * @param {string} props.description - The descriptive text shown under the title.
 * @param {string | number} props.index - The index or position of the card, displayed prominently.
 *
 * @returns {JSX.Element} A styled card component showing the icon, title, description, and index.
 *
 * @example
 * ```tsx
 * <AdvantageCard
 *   icon={CheckIcon}
 *   title="Fast Performance"
 *   description="Our system processes requests in milliseconds."
 *   index={1}
 * />
 * ```
 */
export const AdvantageCard = ({
  icon: Icon,
  title,
  description,
  index,
}: Advantage): JSX.Element => {
  const digitClasses = buildDigitClasses(styles.digitGradient);

  return (
    <article className={containerClasses}>
      <div>
        <div className={iconWrapperClasses}>
          <Icon color={'black'} />
        </div>
        <Typography
          variant={'h3'}
          component={'h5'}
          className={'text-white mb-[12]'}
        >
          {title}
        </Typography>
        <Typography variant={'body'} className={'text-light-gray'}>
          {description}
        </Typography>
      </div>
      <Typography variant={'body'} className={digitClasses}>
        {index}
      </Typography>
    </article>
  );
};
