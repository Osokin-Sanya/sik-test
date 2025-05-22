import { describe, expect, it } from 'vitest';

import { ClassBuilder } from '../classBuilder';

describe('ClassBuilder', () => {
  it('adds classes', () => {
    const result = new ClassBuilder().add('a', 'b').add('c').build();
    expect(result).toBe('a b c');
  });

  it('ignores falsy values when adding', () => {
    const result = new ClassBuilder()
      .add('a', undefined, null, false, 'b')
      .build();
    expect(result).toBe('a b');
  });

  it('removes classes', () => {
    const builder = new ClassBuilder(['a', 'b', 'c']);
    builder.remove('b');
    expect(builder.build()).toBe('a c');
  });

  it('toggles classes based on condition', () => {
    const builder = new ClassBuilder(['a']);
    builder.toggle('b', true).toggle('a', false);
    expect(builder.build()).toBe('b');
  });

  it('checks for class existence', () => {
    const builder = new ClassBuilder(['a', 'b']);
    expect(builder.has('a')).toBe(true);
    expect(builder.has('c')).toBe(false);
  });

  it('handles initial string input', () => {
    const builder = new ClassBuilder('a b c');
    expect(builder.build()).toBe('a b c');
  });
});
