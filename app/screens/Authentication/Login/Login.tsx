import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { skipLogin } from 'app/redux/auth/slice';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { RootState } from 'app/redux/store';
import { useFormik } from 'formik';

import { EmailIcon, PasswordIcon } from 'app/assets/icon';
import { StyledAnimatedWrapper } from 'app/utils/common-styled-components';
import { CustomInput } from 'app/components/CustomInput/CustomInput';
import { RoundButton } from 'app/components/RoundButton/RoundButton';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import {
  MainStackParamList,
  MainStackScreenName,
} from 'app/navigation/app/MainStack.navigator';
import { colors, MainColorName } from 'app/constants/color';
import { Tabs } from 'app/screens/Authentication/Login/components/Tabs/Tabs';
import { useOnSubmit } from 'app/screens/Authentication/Login/hooks/useOnSubmit';
import {
  StyledLine,
  StyledLoginScreenBottomContainer,
  StyledLoginScreenCenterContainer,
  StyledLoginScreenCenterTitle,
  StyledLoginScreenContainer,
  StyledLoginScreenTopContainer,
  StyledSimpleButtonContainer,
} from 'app/screens/Authentication/Login/Login.styled';
import { validate } from 'app/screens/Authentication/Login/utils/utils';

const buttonList = ['Sign Up', 'Sign In'];

const loginScreenTitles = {
  signUpTitle: 'Create An Account',
  signInTitle: 'Welcome Back',
};

export function LoginScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const dispatch = useAppDispatch();
  const { isCreateUserFetch, isLogin, user, createUserError, loginError } =
    useAppSelector((state: RootState) => state.auth);
  const isLoading = isCreateUserFetch || isLogin;
  const onSubmit = useOnSubmit({ currentIndex });
  const onSkipStep = () => {
    dispatch(skipLogin());
  };

  const {
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit,
    validate,
  });
  useEffect(() => {
    if (user) {
      navigation.navigate(MainStackScreenName.Home);
    }
  }, [dispatch, navigation, resetForm, user]);

  useEffect(() => {
    resetForm();
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (createUserError || loginError) {
      resetForm();
    }
  }, [loginError, createUserError]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentIndex(0);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <StyledAnimatedWrapper>
      <StyledLoginScreenContainer testID={'LoginWrapperTestID'}>
        <StyledLoginScreenTopContainer>
          <Tabs
            buttonList={buttonList}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </StyledLoginScreenTopContainer>
        <StyledLoginScreenCenterContainer>
          <StyledLoginScreenCenterTitle testID={'StyledLoginScreenCenterTitle'}>
            {currentIndex === 0
              ? loginScreenTitles.signUpTitle
              : loginScreenTitles.signInTitle}
          </StyledLoginScreenCenterTitle>
          <CustomInput
            onChangeText={handleChange('email')}
            value={values.email}
            icon={<EmailIcon />}
            error={touched?.email ? errors.email : undefined}
            placeholder={'Email'}
            onBlur={handleBlur('email')}
          />
          <CustomInput
            onChangeText={handleChange('password')}
            value={values.password}
            error={touched.password ? errors.password : undefined}
            icon={<PasswordIcon />}
            isPassword={true}
            placeholder={'Password'}
            onBlur={handleBlur('password')}
          />
          <RoundButton
            onPress={handleSubmit}
            title={'Submit'}
            isLoading={isLoading}
            onPressTestID={'HandleSubmitTestID'}
          />
          <StyledSimpleButtonContainer>
            <StyledLine />
            <SimpleButton
              onPress={onSkipStep}
              onPressTestID={'OnSkipStepTestID'}
              title={'Or skip this step'}
              color={colors[MainColorName.BLACK]}
            />
            <StyledLine />
          </StyledSimpleButtonContainer>
        </StyledLoginScreenCenterContainer>
        <StyledLoginScreenBottomContainer />
      </StyledLoginScreenContainer>
    </StyledAnimatedWrapper>
  );
}
