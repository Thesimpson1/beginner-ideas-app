import auth from '@react-native-firebase/auth';

export const getUserInfoApi = () => auth().currentUser;
export interface setUserApiI {
  email: string;
  password: string;
}
export const createUserApi = ({ email, password }: setUserApiI) =>
  auth().createUserWithEmailAndPassword(email, password);
export const loginApi = ({ email, password }: setUserApiI) =>
  auth().signInWithEmailAndPassword(email, password);
