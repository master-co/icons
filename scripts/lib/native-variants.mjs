// Review evidence records the native optical masters. Generated stroke options
// are additional runtime data, not changes to those reviewed masters.
export function nativeVariants(variants) {
  return Object.fromEntries(Object.entries(variants).map(([size, corners]) => [
    size,
    Object.fromEntries(Object.entries(corners).map(([corner, {strokes, ...native}]) => [corner, native])),
  ]));
}
