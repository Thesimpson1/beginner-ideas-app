import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const heightPixelRatio = (amount: number) =>
  PixelRatio.roundToNearestPixel(height * amount);
const widthPixelRatio = (amount: number) =>
  PixelRatio.roundToNearestPixel(width * amount);
// Takes pixel of design and converts them to percents.
const convertHeightPixelsToPercent = (heightInPx: number) =>
  heightInPx / guidelineBaseHeight;
const convertWidthPixelsToPercent = (widthInPx: number) =>
  widthInPx / guidelineBaseWidth;

const scaleWidth = width / guidelineBaseWidth;
const scaleHeight = height / guidelineBaseHeight;
const fontScale = Math.min(scaleWidth, scaleHeight) / PixelRatio.getFontScale();
// Combine the above functions to use in styles
const calcHeight = (px: number) => {
  return heightPixelRatio(convertHeightPixelsToPercent(px));
};
const calcWidth = (px: number) =>
  widthPixelRatio(convertWidthPixelsToPercent(px));
const calcFontSize = (size: number) => size * fontScale;

export { calcHeight, calcWidth, calcFontSize, width, height };
