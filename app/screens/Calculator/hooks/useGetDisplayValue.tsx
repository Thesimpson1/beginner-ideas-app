import { useEffect, useState } from 'react';

import {
  handleAnotherSigns,
  setCalculatedValue,
  setIsAnotherSign,
} from 'app/screens/Calculator/utils/utils';

interface SetDisplayedValueI {
  value: string;
}

export const useGetDisplayedValue = ({ value }: SetDisplayedValueI) => {
  const [currentDisplayedValue, setCurrentDisplayedValue] = useState('0');
  const [prevDisplayedValue, setPrevDisplayedValue] = useState('0');
  const [existOperator, setExistOperator] = useState('');

  useEffect(() => {
    //checks is number
    if (value && isFinite(+value)) {
      setCurrentDisplayedValue(value);
    } else {
      //blue operators logic
      const isBlueSign = setIsAnotherSign({ sign: value });
      if (isBlueSign) {
        const calculated = handleAnotherSigns({
          sign: value,
          currentValue: currentDisplayedValue,
        });
        setCurrentDisplayedValue(calculated);
        return;
      }

      //yellow operators logic
      //if isn't number but there is no operator , then operator is taken down
      if (!existOperator) {
        setExistOperator(value);
        setPrevDisplayedValue(currentDisplayedValue);
      } else {
        //are there prev value, current value ?
        if (currentDisplayedValue === '0' && prevDisplayedValue === '0') {
          return;
        }
        //if there is operator , start to calculate
        const calculatedValue = setCalculatedValue({
          sign: existOperator,
          prevValue: prevDisplayedValue,
          currentValue: currentDisplayedValue,
        });
        if (value === '=') {
          setExistOperator('');
        } else {
          setExistOperator(value);
        }
        setPrevDisplayedValue(calculatedValue);
        setCurrentDisplayedValue(calculatedValue);
      }
      //
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return { currentDisplayedValue };
};
