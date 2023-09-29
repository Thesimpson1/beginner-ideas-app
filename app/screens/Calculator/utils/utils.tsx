import { colors, MainColorName } from 'app/constants/color';
import { RenderPropsI } from 'app/screens/Calculator/Calculator';
interface SetCurrentValueInnerLogicI {
  prevState: string;
  item: string;
}
interface SetCalculatedValueI {
  sign: string;
  prevValue: string;
  currentValue: string;
}
interface CheckIsClickedI {
  text: string;
}
export const getBackgroundColor = ({ item, index }: RenderPropsI) => {
  let backgroundColor = colors[MainColorName.GRAY_BLUE];
  switch (true) {
    case index === 3 || item === '=': {
      return (backgroundColor = colors[MainColorName.ORANGE]);
    }
    case isFinite(+item) || item === ',': {
      return (backgroundColor = colors[MainColorName.GREY]);
    }
  }
  return backgroundColor;
};

export const checkSigns = ({ text }: CheckIsClickedI) => {
  let isRightSign = false;
  switch (true) {
    case text === '/': {
      return (isRightSign = true);
    }
    case text === 'X': {
      return (isRightSign = true);
    }
    case text === '-': {
      return (isRightSign = true);
    }
    case text === '+': {
      return (isRightSign = true);
    }
  }
  return isRightSign;
};
export const setCurrentValueInnerLogic = ({
  prevState,
  item,
}: SetCurrentValueInnerLogicI) => {
  //not number
  if (!isFinite(+item)) {
    //first time, return sign
    if (prevState !== item) {
      return item;
    } else {
      //second, empty string
      return '';
    }
  }
  //begin calculator and check after sign
  if (prevState === '0' || !isFinite(+prevState)) {
    return item;
  }
  //return only numbers
  return prevState + item;
};

export const setCalculatedValue = ({
  sign,
  prevValue,
  currentValue,
}: SetCalculatedValueI): string => {
  let calculatedValue = 0;
  switch (true) {
    case sign === '-': {
      calculatedValue = +prevValue - +currentValue;
      break;
    }
    case sign === '+': {
      calculatedValue = +prevValue + +currentValue;
      break;
    }
  }
  return calculatedValue + '';
};
