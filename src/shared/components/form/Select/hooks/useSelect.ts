import { useEffect, useRef, useState } from 'react';

import { Option } from '../types';

type Props = {
  options: Option[];
  onChange: (value: string) => void;
  onBlur: () => void;
};

/**
 * Custom React hook for building accessible, keyboard-navigable select/dropdown components.
 *
 * Features:
 * - Manages open/close dropdown state.
 * - Handles keyboard interactions (ArrowUp, ArrowDown, Enter, Escape).
 * - Scrolls to highlighted option.
 * - Detects outside clicks to close the dropdown.
 *
 * @param {Object} props - Props for the hook.
 * @param {Option[]} props.options - The list of selectable options.
 * @param {(value: string) => void} props.onChange - Callback triggered when an option is selected.
 * @param {(value: string) => void} props.onBlur - Callback triggered when an option is selected.
 *
 * @returns {Object} Hook return values and refs.
 * @returns {boolean} return.isOpen - Whether the dropdown is open.
 * @returns {number} return.highlightedIndex - Currently highlighted option index.
 * @returns {() => void} return.handleToggle - Toggles the dropdown open/closed.
 * @returns {(e: React.KeyboardEvent<HTMLButtonElement>) => void} return.handleKeyDown - Handles key interactions on the toggle button.
 * @returns {(option: Option) => void} return.handleSelect - Handles option selection.
 * @returns {React.MutableRefObject<HTMLButtonElement | null>} return.buttonRef - Ref to the toggle button.
 * @returns {React.MutableRefObject<HTMLUListElement | null>} return.listRef - Ref to the options list.
 * @returns {React.MutableRefObject<HTMLDivElement | null>} return.containerRef - Ref to the container for outside click detection.
 * @returns {(index: number) => void} return.setHighlightedIndex - Manually set the highlighted index.
 */
export const useSelect = ({ options, onChange, onBlur }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: Option) => {
    setIsOpen(false);
    onChange(option.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (isOpen) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % options.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(
            (prev) => (prev - 1 + options.length) % options.length,
          );
          break;
        case 'Enter':
          e.preventDefault();
          onBlur();
          handleSelect(options[highlightedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          onBlur();
          break;
      }
    }
  };

  useEffect(() => {
    if (isOpen && listRef.current) {
      const listItems = listRef.current.querySelectorAll('[role="option"]');
      const target = listItems[highlightedIndex] as HTMLElement;

      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, highlightedIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onBlur();
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur]);

  return {
    isOpen,
    handleKeyDown,
    highlightedIndex,
    handleToggle,
    setHighlightedIndex,
    handleSelect,

    buttonRef,
    listRef,
    containerRef,
  };
};
