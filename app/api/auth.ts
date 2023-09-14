import auth from '@react-native-firebase/auth';

export const getUserInfoApi = () => auth().currentUser;
interface setUserApiI {
  email: string;
  password: string;
}
export const setUserInfoApi = ({ email, password }: setUserApiI) =>
  auth().createUserWithEmailAndPassword(email, password);
