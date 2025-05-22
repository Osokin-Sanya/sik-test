/**
 * Utility class to build and manage class name strings in a safe and composable way.
 * Now supports Tailwind utility classes for hover and responsive breakpoints.
 */
export class ClassBuilder {
  private classSet: Set<string>;

  /**
   * Creates a new ClassBuilder instance.
   * @param initial - Initial class names as a string (space-separated) or array.
   */
  constructor(initial?: string | string[]) {
    this.classSet = new Set(
      typeof initial === 'string' ? initial.trim().split(/\s+/) : initial || [],
    );
  }

  /**
   * Adds one or more class names to the builder.
   * Falsy values (undefined, null, false) are ignored.
   * @param classes - Class names to add.
   * @returns The current ClassBuilder instance (for chaining).
   */
  add(...classes: (string | undefined | false | null)[]) {
    for (const cls of classes) {
      if (cls) this.classSet.add(cls);
    }
    return this;
  }

  /**
   * Removes one or more class names from the builder.
   * @param classes - Class names to remove.
   * @returns The current ClassBuilder instance (for chaining).
   */
  remove(...classes: string[]) {
    for (const cls of classes) {
      this.classSet.delete(cls);
    }
    return this;
  }

  /**
   * Toggles a class name based on a boolean condition.
   * @param cls - Class name to toggle.
   * @param condition - If true, the class is added; if false, it is removed.
   * @returns The current ClassBuilder instance (for chaining).
   */
  toggle(cls: string, condition: boolean) {
    if (condition) {
      this.classSet.add(cls);
    } else {
      this.classSet.delete(cls);
    }
    return this;
  }

  /**
   * Checks if a class name is present.
   * @param cls - Class name to check.
   * @returns True if the class is present, false otherwise.
   */
  has(cls: string) {
    return this.classSet.has(cls);
  }

  /**
   * Builds and returns the final space-separated class name string.
   * @returns A string with all class names, separated by spaces.
   */
  build() {
    return Array.from(this.classSet).join(' ');
  }
}
