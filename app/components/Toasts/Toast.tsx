import React from 'react';
import { View } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

import {
  StyledBaseToast,
  StyledErrorToast,
} from 'app/components/Toasts/Toast.styled';

export const toastMessageConfig: ToastConfig = {
  errorToaster: (params) => {
    return (
      <View testID={'StyledErrorToastTest'}>
        <StyledErrorToast {...params} />
      </View>
    );
  },
  successToaster: (params) => {
    return (
      <View testID={'StyledBaseToastTest'}>
        <StyledBaseToast {...params} />
      </View>
    );
  },
};
