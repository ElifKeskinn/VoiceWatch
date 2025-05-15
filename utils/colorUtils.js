import tinycolor from 'tinycolor2';

/**
 * Normalize color input to an RGBA string, applying optional opacity multiplier.
 * Compatible with both web and mobile (Hermes-safe).
 *
 * @param {string} color - Any valid CSS color
 * @param {number} opacity - Opacity multiplier (0 to 1)
 * @returns {string|null} RGBA color string or null if invalid
 */
export const normalizeColor = (color, opacity = 1) => {
  if (!color) return null;

  const parsed = tinycolor(color);

  if (!parsed.isValid()) {
    console.warn('Invalid color input:', color);
    return null;
  }

  const { r, g, b, a } = parsed.toRgb();
  const finalAlpha = Math.min(1, Math.max(0, a * opacity));
  return `rgba(${r},${g},${b},${finalAlpha.toFixed(2)})`;
};

const isWebColor = color => {
  return (
    color === 'currentcolor' ||
    color === 'currentColor' ||
    color === 'inherit' ||
    color.indexOf('var(') === 0
  );
};
