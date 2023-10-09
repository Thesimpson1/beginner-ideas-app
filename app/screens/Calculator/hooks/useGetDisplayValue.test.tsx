import { renderHook } from '@testing-library/react-native';

import { useGetDisplayedValue } from 'app/screens/Calculator/hooks/useGetDisplayValue';

describe('Test useGetDisplayValue', () => {
  it('currentDisplayedValue has to be correct', () => {
    //simple number
    const { result, rerender } = renderHook(
      (value: string) => useGetDisplayedValue({ value }),
      { initialProps: '30' }
    );
    const currentDisplayedValue1 = result.current;

    expect(currentDisplayedValue1.currentDisplayedValue).toBe('30');

    //check blue operators
    rerender('%');
    const currentDisplayedValue2 = result.current;
    expect(currentDisplayedValue2.currentDisplayedValue).toBe('0.30');

    //check yellow operators
    rerender('-');
    const currentDisplayedValue4 = result.current;
    expect(currentDisplayedValue4.currentDisplayedValue).toBe('0.30');

    rerender('0.1');
    const currentDisplayedValue5 = result.current;
    expect(currentDisplayedValue5.currentDisplayedValue).toBe('0.1');

    rerender('=');
    const currentDisplayedValue6 = result.current;
    expect(currentDisplayedValue6.currentDisplayedValue).toBe('0.20');

    rerender('+');
    const currentDisplayedValue7 = result.current;
    expect(currentDisplayedValue7.currentDisplayedValue).toBe('0.20');

    rerender('0.20');
    const currentDisplayedValue8 = result.current;
    expect(currentDisplayedValue8.currentDisplayedValue).toBe('0.20');

    rerender('+');
    const currentDisplayedValue9 = result.current;
    expect(currentDisplayedValue9.currentDisplayedValue).toBe('0.40');

    rerender('0');
    rerender('0');
    const currentDisplayedValue10 = result.current;
    expect(currentDisplayedValue10.currentDisplayedValue).toBe('0');
  });
});
