import { createUser, login } from 'app/redux/auth/slice';
import { useAppDispatch } from 'app/redux/hooks';
interface UseOnSubmitI {
  currentIndex: number;
}
interface FormValueI {
  password: string;
  email: string;
}
export const useOnSubmit = ({ currentIndex }: UseOnSubmitI) => {
  const dispatch = useAppDispatch();
  return (formValue: FormValueI) => {
    const { email, password } = formValue;
    currentIndex === 0
      ? dispatch(createUser({ email, password }))
      : dispatch(login({ email, password }));
  };
};
