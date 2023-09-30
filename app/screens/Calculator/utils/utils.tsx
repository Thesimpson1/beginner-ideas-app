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
interface HandleAnotherSignsI {
  sign: string;
  currentValue: string;
}
//ui function, return different backrgound
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
//checks strings, this function needs for display a chosen  operators
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
//return number or operator
export const setCurrentValueInnerLogic = ({
  prevState,
  item,
}: SetCurrentValueInnerLogicI) => {
  //not number
  if (!isFinite(+item)) {
    // define blue signs
    if (setIsAnotherSign({ sign: item })) {
      //when sign doesn't change this can call rerender
      return `${item} ${Math.random()}`;
    }
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
//calculate the equation
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
    case sign === 'X': {
      calculatedValue = +prevValue * +currentValue;
      break;
    }
    case sign === '/': {
      calculatedValue = +prevValue / +currentValue;
      break;
    }
  }
  return calculatedValue + '';
};
//function for checking another signs
export const setIsAnotherSign = ({ sign }: { sign: string }) => {
  let isAnotherSign = false;
  switch (true) {
    case sign.includes('C'): {
      isAnotherSign = true;
      break;
    }
    case sign.includes('+/-'): {
      isAnotherSign = true;
      break;
    }
    case sign.includes('%'): {
      isAnotherSign = true;
      break;
    }
  }
  return isAnotherSign;
};
//function for handling another signs
export const handleAnotherSigns = ({
  sign,
  currentValue,
}: HandleAnotherSignsI) => {
  let calculatedValue = 0;
  switch (true) {
    case sign.includes('C'): {
      calculatedValue = 0;
      break;
    }
    case sign.includes('+/-'): {
      calculatedValue = -currentValue;
      break;
    }
    case sign.includes('%'): {
      calculatedValue = +currentValue / 100;
      break;
    }
  }
  return calculatedValue + '';
};
