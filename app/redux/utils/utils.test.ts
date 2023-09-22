import ToastMessage from 'react-native-toast-message';
import { errorHandler } from 'app/redux/utils/utils';

jest.mock('app/redux/utils/utils', () => {
  const originalModule = jest.requireActual('app/redux/utils/utils');

  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('Redux utils', () => {
  const toastMockParams = {
    position: 'top',
    text1: 'Something went wrong',
    type: 'errorToaster',
    visibilityTime: 3000,
  };
  it('errorHandler has to return correct string dependently of errors which comes from props', () => {
    let error = '';
    const mockShow = jest.spyOn(ToastMessage, 'show');
    errorHandler(error);
    expect(mockShow).toHaveBeenCalledTimes(1);
    expect(mockShow).toHaveBeenCalledWith(toastMockParams);

    error = 'auth/email-already-in-use';
    toastMockParams.text1 = 'That email address is already in use!';
    errorHandler(error);
    expect(mockShow).toHaveBeenCalledTimes(2);
    expect(mockShow).toHaveBeenCalledWith(toastMockParams);

    error = 'auth/invalid-email';
    toastMockParams.text1 = 'That email address is invalid!';
    errorHandler(error);
    expect(mockShow).toHaveBeenCalledTimes(3);
    expect(mockShow).toHaveBeenCalledWith(toastMockParams);

    error = 'auth/user-not-found';
    toastMockParams.text1 = "User doesn't exist";
    errorHandler(error);
    expect(mockShow).toHaveBeenCalledTimes(4);
    expect(mockShow).toHaveBeenCalledWith(toastMockParams);
  });
});
