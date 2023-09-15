import { JSXElementConstructor, ReactElement } from 'react';
import { ToastPosition } from 'react-native-toast-message/lib/src/types';
import { render } from '@testing-library/react-native';

import { toastMessageConfig } from 'app/components/Toasts/Toast';
jest.mock('app/components/Toasts/Toast.tsx', () => {
  const originalModule = jest.requireActual('app/components/Toasts/Toast.tsx');

  return {
    __esModule: true,
    ...originalModule,
  };
});
describe('Toasts tests', () => {
  const params = {
    position: 'top' as ToastPosition,
    type: 'some',
    isVisible: true,
    text1: 'hello',
    show: () => {},
    hide: () => {},
    onPress: () => {},
    props: {},
  };
  it('Should render success toaster', () => {
    const SuccessToaster = toastMessageConfig.successToaster(params);
    const { getByTestId } = render(
      SuccessToaster as ReactElement<
        unknown,
        string | JSXElementConstructor<unknown>
      >
    );
    const StyledBaseToastTest = getByTestId('StyledBaseToastTest');

    expect(StyledBaseToastTest.props).toBeTruthy();
  });
  it('Should render error toaster', () => {
    const ErrorToaster = toastMessageConfig.errorToaster(params);
    const { getByTestId } = render(
      ErrorToaster as ReactElement<
        unknown,
        string | JSXElementConstructor<unknown>
      >
    );
    const StyledErrorToastTest = getByTestId('StyledErrorToastTest');

    expect(StyledErrorToastTest.props).toBeTruthy();
  });
});
