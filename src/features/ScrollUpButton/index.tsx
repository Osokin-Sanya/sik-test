'use client';

import { useEffect, useState } from 'react';

import { IconButton } from '@/shared/components';
import { ArrowTopLongIcon } from '@/shared/icons';

import { buildContainerStyles } from './styles';

/**
 * ScrollUpButton component shows a button that allows users to quickly scroll back to the top of the page.
 *
 * The button becomes visible when the user scrolls down more than half the viewport height.
 * Clicking the button smoothly scrolls the page to the top.
 *
 * @component
 * @example
 * return <ScrollUpButton />;
 */
export const ScrollUpButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const classes = buildContainerStyles(isEnabled);

  const tabIndex = isEnabled ? 0 : -1;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let enabled = false;

    const handleScroll = () => {
      const triggerHeight = window.innerHeight / 2;
      const scrollHeight = window.scrollY;

      if (!enabled && scrollHeight >= triggerHeight) {
        enabled = true;
        setIsEnabled(scrollHeight >= triggerHeight);
      }

      if (enabled && scrollHeight <= triggerHeight) {
        enabled = false;
        setIsEnabled(scrollHeight >= triggerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <IconButton
      className={classes}
      onClick={handleClick}
      ariaLabel={'Return to top'}
      tabIndex={tabIndex}
    >
      <ArrowTopLongIcon size={36} />
    </IconButton>
  );
};
