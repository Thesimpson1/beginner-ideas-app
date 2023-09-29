import { useEffect, useState } from 'react';

import { setCalculatedValue } from 'app/screens/Calculator/utils/utils';

interface SetDisplayedValueI {
  value: string;
}

export const useGetDisplayedValue = ({ value }: SetDisplayedValueI) => {
  const [currentDisplayedValue, setCurrentDisplayedValue] = useState('0');
  const [prevDisplayedValue, setPrevDisplayedValue] = useState('');
  const [existSign, setExistSign] = useState('');
  useEffect(() => {
    if (isFinite(+value)) {
      setCurrentDisplayedValue(value);
    } else {
      if (!existSign) {
        setExistSign(value);
        setPrevDisplayedValue(currentDisplayedValue);
      } else {
        const calculatedValue = setCalculatedValue({
          sign: existSign,
          prevValue: prevDisplayedValue,
          currentValue: currentDisplayedValue,
        });
        if (value === '=') {
          setExistSign('');
        } else {
          setExistSign(value);
        }
        setPrevDisplayedValue(calculatedValue);
        setCurrentDisplayedValue(calculatedValue);
      }
    }
  }, [value]);

  return { currentDisplayedValue };
};
