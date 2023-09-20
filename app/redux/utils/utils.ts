import ToastMessage from 'react-native-toast-message';

export const errorHandler = (errorCode: string) => {
  let textError = '';
  if (errorCode === 'auth/email-already-in-use') {
    textError = 'That email address is already in use!';
  }
  if (errorCode === 'auth/invalid-email') {
    textError = 'That email address is invalid!';
  }
  if (errorCode === 'auth/user-not-found') {
    textError = "User doesn't exist";
  }
  if (textError === '') {
    textError = 'Something went wrong';
  }
  ToastMessage?.show({
    type: 'errorToaster',
    visibilityTime: 3000,
    text1: textError,
    position: 'top',
  });
};
