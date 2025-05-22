'use client';

import { JSX } from 'react';

import { Stars, Typography } from '@/shared/components';
import { useGetCssVariable } from '@/shared/hooks';
import { MapMarkerIcon } from '@/shared/icons';

import { Review } from '../../types';

import {
  containerClasses,
  middleNesterContainerClasses,
  topNesterContainerClasses,
} from './styles';

/**
 * Renders a review card with name, position, star rating, location, and description.
 *
 * @component
 * @param {Review} props - Props for the review card.
 * @param {string} props.name - Name of the reviewer.
 * @param {string} props.location - Location of the reviewer.
 * @param {number} props.stars - Star rating from 0 to 5.
 * @param {string} props.position - Reviewer’s position or role.
 * @param {string} props.description - Text of the review.
 *
 * @returns {JSX.Element} A rendered review card component.
 *
 * @example
 * <ReviewCard
 *   name="John Doe"
 *   location="New York, USA"
 *   stars={5}
 *   position="Software Engineer"
 *   description="Amazing service!"
 * />
 */
export const ReviewCard = ({
  name,
  location,
  stars,
  position,
  description,
}: Review): JSX.Element => {
  const markerIconColor = useGetCssVariable('--color-main', 'white');

  return (
    <article className={containerClasses}>
      <div className={topNesterContainerClasses}>
        <div className={'flex items-center'}>
          <Typography className={'text-white'} variant={'h3'} component={'h5'}>
            {name}
          </Typography>
          <Typography
            aria-label={position}
            className={'ml-2 text-light-gray'}
            variant={'body'}
          >
            {position}
          </Typography>
        </div>
        <Stars count={5} active={stars} />
      </div>
      <div className={middleNesterContainerClasses}>
        <MapMarkerIcon color={markerIconColor} size={16} />
        <Typography className={'ml-1 text-main'} variant={'body'}>
          {location}
        </Typography>
      </div>
      <Typography variant={'body'} className={'text-light-gray'}>
        {description}
      </Typography>
    </article>
  );
};
