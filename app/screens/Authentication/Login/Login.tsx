import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useFormik } from 'formik';

import { EmailIcon, PasswordIcon, PersonIcon } from 'app/assets/icon';
import { CustomInput } from 'app/components/CustomInput/CustomInput';
import { RoundButton } from 'app/components/RoundButton/RoundButton';
import { SimpleButton } from 'app/components/SimpleButton/SimpleButton';
import { colors, MainColorName } from 'app/constants/color';
import { Tabs } from 'app/screens/Authentication/Login/components/Tabs/Tabs';
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
  // // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  //
  // // Handle user state changes
  // function onAuthStateChanged(users) {
  //   setUser(users);
  //   if (users === null) {
  //     auth()
  //       .createUserWithEmailAndPassword(
  //         'arturbiosdev@gmail.com',
  //         'SuperSecretPassword!'
  //       )
  //       .then(() => {
  //         console.log('User account created & signed in!');
  //       });
  //   }
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // }
  //
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);
  /////////////
  // const dispatch = useAppDispatch();
  // const userData = useAppSelector((state: RootState) => state.auth.user);
  // const userFetchStatus = useAppSelector(
  //   (state: RootState) => state.auth.isFetchUserInfo
  // );

  const { errors, values, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        password: '',
        email: '',
      },
      onSubmit: (formValue) => {
        Alert.alert(JSON.stringify(formValue, null, 2));
      },
      validate,
    });

  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <StyledLoginScreenContainer>
      <StyledLoginScreenTopContainer>
        <Tabs
          buttonList={buttonList}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </StyledLoginScreenTopContainer>
      <StyledLoginScreenCenterContainer>
        <StyledLoginScreenCenterTitle>
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
        <RoundButton onPress={handleSubmit} title={'Submit'} />
        <StyledSimpleButtonContainer>
          <StyledLine />
          <SimpleButton
            onPress={() => {}}
            title={'Or skip this step'}
            color={colors[MainColorName.BLACK]}
          />
          <StyledLine />
        </StyledSimpleButtonContainer>

        {/*<Button onPress={handleSubmit} title="Submit" />*/}
      </StyledLoginScreenCenterContainer>
      <StyledLoginScreenBottomContainer />
      {/*<Text>Hello My Start Screen</Text>*/}
      {/*<Text testID={'userFetchStatus'}>{JSON.stringify(userFetchStatus)}</Text>*/}
      {/*<Text testID={'UserDataTestID'}>{JSON.stringify(userData)}</Text>*/}
      {/*<Button*/}
      {/*  title={'lclick me'}*/}
      {/*  testID={'ButtonTestId'}*/}
      {/*  onPress={() => dispatch(getUserInfo())}*/}
      {/*/>*/}
      {/*{userFetchStatus && <Text>Fetching user...</Text>}*/}
    </StyledLoginScreenContainer>
  );
}
