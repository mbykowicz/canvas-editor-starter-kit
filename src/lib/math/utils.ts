/**
 * Clamps a number between a minimum and maximum value.
 * @param value The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped number.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Linearly interpolates between two numbers.
 * @param a The start value.
 * @param b The end value.
 * @param t The interpolation factor (usually between 0 and 1).
 * @returns The interpolated value.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Converts degrees to radians.
 * @param degrees The angle in degrees.
 * @returns The angle in radians.
 */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Converts radians to degrees.
 * @param radians The angle in radians.
 * @returns The angle in degrees.
 */
export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI)
}

/**
 * Remaps a number from one range to another.
 * @param value The number to remap.
 * @param inMin The minimum value of the input range.
 * @param inMax The maximum value of the input range.
 * @param outMin The minimum value of the output range.
 * @param outMax The maximum value of the output range.
 * @returns The remapped number.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Checks if two numbers are approximately equal within a given tolerance.
 * This is useful for floating-point comparisons.
 * @param a The first number.
 * @param b The second number.
 * @param epsilon The tolerance (a small positive number). Defaults to a very small value.
 * @returns True if the numbers are approximately equal, false otherwise.
 */
export function fuzzyEquals(
  a: number,
  b: number,
  epsilon: number = 0.000001,
): boolean {
  return Math.abs(a - b) < epsilon
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param value The number to round.
 * @param decimalPlaces The number of decimal places to round to.
 * @returns The rounded number.
 */
export function roundToPrecision(value: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(value * factor) / factor
}

/**
 * Determines the sign of a number.
 * Returns -1 for negative numbers, 1 for positive numbers, and 0 for zero.
 * Note: Math.sign() exists, but this is an alternative if you need to support older environments
 * or want a slightly different behavior for -0 if that becomes relevant.
 * For most modern cases, Math.sign() is preferred.
 * @param value The number.
 * @returns -1, 0, or 1.
 */
export function sign(value: number): number {
  if (value < 0) {
    return -1
  }
  if (value > 0) {
    return 1
  }
  return 0
}
