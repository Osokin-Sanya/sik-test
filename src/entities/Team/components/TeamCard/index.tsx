'use client';

import Image from 'next/image';
import { JSX } from 'react';

import { IconButton, Typography } from '@/shared/components';
import { useGetCssVariable, useResizeObserver } from '@/shared/hooks';
import { LinkedIdIcon, TopRightArrowIcon } from '@/shared/icons';

import { TeamMember } from '../../types';

import { arrowStyles, imageContainerStyles, linkedInStyles } from './styles';

/**
 * Renders a team member card with image, name, position, and LinkedIn link.
 *
 * @component
 * @param {TeamMember} props - Props for the component.
 * @param {string} props.imagePath - Path to the team member's image.
 * @param {string} props.name - Name of the team member.
 * @param {string} props.position - Position or title of the team member.
 * @param {string} props.linkedIdUrl - URL to the team member's LinkedIn profile.
 *
 * @returns {JSX.Element} A rendered card component for a team member.
 */
export const TeamCard = ({
  imagePath,
  name,
  position,
  linkedIdUrl,
}: TeamMember): JSX.Element => {
  const { ref, size } = useResizeObserver();

  const iconColor = useGetCssVariable('--color-black', 'black');

  const handleArrowIconClick = () => {
    window.location.href = linkedIdUrl;
  };

  return (
    <article aria-label={`team-member ${name}`} ref={ref}>
      <a href={linkedIdUrl} target="_blank" rel="noopener noreferrer">
        <div className={imageContainerStyles}>
          <Image
            quality={80}
            src={imagePath}
            alt={`image ${name}`}
            width={size.width}
            height={size.width}
          />
          <div className={linkedInStyles}>
            <LinkedIdIcon color={iconColor} />
          </div>
          <div className={arrowStyles}>
            <IconButton
              shape={'round-md'}
              onClick={handleArrowIconClick}
              ariaLabel={'Visit linkedIn'}
            >
              <TopRightArrowIcon color={iconColor} size={20} />
            </IconButton>
          </div>
        </div>
      </a>
      <div>
        <Typography className={'mb-2'} variant={'h3'} component={'h5'}>
          {name}
        </Typography>
        <Typography className={'text-light-gray'} variant={'body'}>
          {position}
        </Typography>
      </div>
    </article>
  );
};
