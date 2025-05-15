import {Platform} from 'react-native';

export const normalizeColor = async (color, opacity = 1) => {
  if (color == null) return;

  if (typeof color === 'string' && isWebColor(color)) {
    return color;
  }

  if (Platform.OS === 'web') {
    try {
      const ConvertNumberIntoHex = (await import('normalize-css-color'))
        .default;
      const colorInt = processColor(color, ConvertNumberIntoHex);
      if (colorInt != null) {
        const r = (colorInt >> 16) & 255;
        const g = (colorInt >> 8) & 255;
        const b = colorInt & 255;
        const a = ((colorInt >> 24) & 255) / 255;
        const alpha = (a * opacity).toFixed(2);
        return `rgba(${r},${g},${b},${alpha})`;
      }
    } catch (error) {
      console.warn('Color normalization failed:', error);
      return color;
    }
  }

  return color;
};

const isWebColor = color => {
  return (
    color === 'currentcolor' ||
    color === 'currentColor' ||
    color === 'inherit' ||
    color.indexOf('var(') === 0
  );
};

const processColor = (color, converter) => {
  if (!color || !converter) return color;
  const int32Color = converter(color);
  if (!int32Color) return undefined;
  return ((int32Color << 24) | (int32Color >>> 8)) >>> 0;
};
