import { renderHook } from '@testing-library/react-native';

import { useOnSubmit } from 'app/screens/Authentication/Login/hooks/useOnSubmit';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useDispatch: () => mockDispatch,
  };
});
describe('Use on submit', () => {
  const mockCreateUserType = 'auth/createUser';
  const mockLoginType = 'auth/login';
  const mockPayload = { email: 'mockEmail', password: 'mockPassword' };

  it('Check on submit when current index == 0', async () => {
    const currentIndex = 0;

    const { result } = renderHook(() => useOnSubmit({ currentIndex }));
    result.current(mockPayload);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: mockPayload,
      type: mockCreateUserType,
    });
  });
  it('Check on submit when current index == 1', async () => {
    const currentIndex = 1;

    const { result } = renderHook(() => useOnSubmit({ currentIndex }));
    result.current(mockPayload);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenLastCalledWith({
      payload: mockPayload,
      type: mockLoginType,
    });
  });
});
