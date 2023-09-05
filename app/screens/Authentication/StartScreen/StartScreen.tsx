import React from 'react';
import { Button, Text, View } from 'react-native';
import { getUserInfo } from 'app/redux/auth/slice';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { RootState } from 'app/redux/store';

export function StartScreen() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: RootState) => state.auth.user);
  const userFetchStatus = useAppSelector(
    (state: RootState) => state.auth.isFetchUserInfo
  );
  return (
    <View>
      {/*<Text>Hello My Start Screen</Text>*/}
      <Text testID={'userFetchStatus'}>{JSON.stringify(userFetchStatus)}</Text>
      <Text testID={'UserDataTestID'}>{JSON.stringify(userData)}</Text>
      <Button
        title={'lclick me'}
        testID={'ButtonTestId'}
        onPress={() => dispatch(getUserInfo())}
      />
      {/*{userFetchStatus && <Text>Fetching user...</Text>}*/}
    </View>
  );
}
