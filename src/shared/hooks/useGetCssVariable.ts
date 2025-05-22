import { useEffect, useState } from 'react';

/**
 * Custom hook to get the value of a CSS variable from the `document.body`.
 *
 * @param {string} cssVar - The name of the CSS variable (e.g., '--color-black').
 * @param {string} defaultValue - The default value to use before the CSS variable is read.
 *
 * @returns {string} The value of the CSS variable or the default value.
 *
 * @example
 * const color = useGetCssVariable('--primary-color', '#000000');
 */
export const useGetCssVariable = (
  cssVar: string,
  defaultValue: string,
): string => {
  const [variable, setVariable] = useState<string>(defaultValue);

  useEffect(() => {
    const variable = window
      .getComputedStyle(document.body)
      .getPropertyValue(cssVar);

    if (variable) {
      setVariable(variable);
    }
  }, [cssVar]);

  return variable;
};
