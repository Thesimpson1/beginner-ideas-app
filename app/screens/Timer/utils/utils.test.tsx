import { colors, MainColorName } from 'app/constants/color';
import {
  checkSigns,
  getBackgroundColor,
  handleAnotherSigns,
  returnedValueHandler,
  setCalculatedValue,
  setCurrentValueInnerLogic,
  setIsAnotherSign,
} from 'app/screens/Calculator/utils/utils';

jest.mock('app/screens/Calculator/utils/utils', () => {
  const originalModule = jest.requireActual(
    'app/screens/Calculator/utils/utils'
  );

  return {
    __esModule: true,
    ...originalModule,
  };
});
describe('Calculator utils', () => {
  it('returnedValueHandler should work correct', () => {
    //simple case
    const functionResult0 = returnedValueHandler('10');
    expect(functionResult0).toBe('10');
    //case when there is .00
    const functionResult1 = returnedValueHandler('10.00');
    expect(functionResult1).toBe('10');
    //case when there is .00 and a big number
    const functionResult2 = returnedValueHandler('1000000.00');
    expect(functionResult2).toBe('1000000');
    //case when a very big number
    const functionResult3 = returnedValueHandler('100000000');
    expect(functionResult3).toBe('1000000');
  });
  it('getBackgroundColor should work correct', () => {
    //blue operators
    const functionResult0 = getBackgroundColor({ item: 'C', index: 1 });
    expect(functionResult0).toBe(colors[MainColorName.GRAY_BLUE]);
    //gray numbers
    const functionResult1 = getBackgroundColor({ item: '1', index: 1 });
    expect(functionResult1).toBe(colors[MainColorName.GREY]);
    const functionResult2 = getBackgroundColor({ item: '.', index: 1 });
    expect(functionResult2).toBe(colors[MainColorName.GREY]);
    //orange operators
    const functionResult3 = getBackgroundColor({ item: '-', index: 3 });
    expect(functionResult3).toBe(colors[MainColorName.ORANGE]);
    const functionResult4 = getBackgroundColor({ item: '=', index: 1 });
    expect(functionResult4).toBe(colors[MainColorName.ORANGE]);
  });
  it('checkSigns should work correct', () => {
    const functionResult0 = checkSigns({ text: '2' });
    expect(functionResult0).toBeFalsy();
    const functionResult1 = checkSigns({ text: '/' });
    expect(functionResult1).toBeTruthy();
    const functionResult2 = checkSigns({ text: 'X' });
    expect(functionResult2).toBeTruthy();
    const functionResult3 = checkSigns({ text: '-' });
    expect(functionResult3).toBeTruthy();
    const functionResult4 = checkSigns({ text: '+' });
    expect(functionResult4).toBeTruthy();
  });
  it('setCurrentValueInnerLogic should work correct', () => {
    //not an integer number
    const functionResult0 = setCurrentValueInnerLogic({
      prevState: '.',
      item: '.',
    });
    expect(functionResult0).toBe('.');
    const functionResult1 = setCurrentValueInnerLogic({
      prevState: '0',
      item: '.',
    });
    expect(functionResult1).toBe('0.');
    const functionResult2 = setCurrentValueInnerLogic({
      prevState: '.',
      item: '2',
    });
    expect(functionResult2).toBe('2');
    //not number
    const functionResult3 = setCurrentValueInnerLogic({
      prevState: '10',
      item: 'C',
    });
    expect(functionResult3.includes('C')).toBeTruthy();
    const functionResult4 = setCurrentValueInnerLogic({
      prevState: '10',
      item: '-',
    });
    expect(functionResult4).toBe('-');
    const functionResult41 = setCurrentValueInnerLogic({
      prevState: '-',
      item: '-',
    });
    expect(functionResult41).toBe('');
    //begin calculator and check after operator
    const functionResult5 = setCurrentValueInnerLogic({
      prevState: '-',
      item: '10',
    });
    expect(functionResult5).toBe('10');
    const functionResult6 = setCurrentValueInnerLogic({
      prevState: '0',
      item: '2',
    });
    expect(functionResult6).toBe('2');
    //only numbers
    const functionResult7 = setCurrentValueInnerLogic({
      prevState: '22222222',
      item: '2',
    });
    expect(functionResult7).toBe('22222222');
    const functionResult8 = setCurrentValueInnerLogic({
      prevState: '2',
      item: '2',
    });
    expect(functionResult8).toBe('22');
  });
  it('setCalculatedValue should work correct', () => {
    const prevValue = '10';
    const currentValue = '20';
    const functionResult0 = setCalculatedValue({
      prevValue,
      currentValue,
      sign: '-',
    });
    expect(functionResult0).toBe('-10');
    const functionResult1 = setCalculatedValue({
      prevValue,
      currentValue,
      sign: '+',
    });
    expect(functionResult1).toBe('30');
    const functionResult2 = setCalculatedValue({
      prevValue,
      currentValue,
      sign: 'X',
    });
    expect(functionResult2).toBe('200');
    const functionResult3 = setCalculatedValue({
      prevValue,
      currentValue,
      sign: '/',
    });
    expect(functionResult3).toBe('0.50');
    const functionResult4 = setCalculatedValue({
      prevValue: '10000000',
      currentValue: '1000000',
      sign: 'X',
    });
    expect(functionResult4).toBe('1000000');
    const functionResult5 = setCalculatedValue({
      prevValue: '0.323232',
      currentValue: '0.3434',
      sign: '/',
    });
    expect(functionResult5).toBe('0.94');
    const functionResult6 = setCalculatedValue({
      prevValue: '0',
      currentValue: '0',
      sign: '/',
    });
    expect(functionResult6).toBe('0');
  });
  it('setIsAnotherSign should work correct', () => {
    const functionResult0 = setIsAnotherSign({ sign: '-' });
    expect(functionResult0).toBeFalsy();
    const functionResult1 = setIsAnotherSign({ sign: 'C' });
    expect(functionResult1).toBeTruthy();
    const functionResult2 = setIsAnotherSign({ sign: '+/-' });
    expect(functionResult2).toBeTruthy();
    const functionResult3 = setIsAnotherSign({ sign: '%' });
    expect(functionResult3).toBeTruthy();
  });
  it('handleAnotherSigns should work correct', () => {
    const currentValue = '10';
    const functionResult0 = handleAnotherSigns({ sign: '-', currentValue });
    expect(functionResult0).toBe('0');
    const functionResult1 = handleAnotherSigns({ sign: 'C', currentValue });
    expect(functionResult1).toBe('0');
    const functionResult2 = handleAnotherSigns({ sign: '+/-', currentValue });
    expect(functionResult2).toBe('-10');
    const functionResult3 = handleAnotherSigns({ sign: '%', currentValue });
    expect(functionResult3).toBe('0.10');
    const functionResult4 = handleAnotherSigns({
      sign: '%',
      currentValue: '100000000',
    });
    expect(functionResult4).toBe('1000000');
  });
});
