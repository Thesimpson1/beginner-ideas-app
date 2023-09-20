import { validate } from 'app/screens/Authentication/Login/utils/utils';

jest.mock('app/screens/Authentication/Login/utils/utils', () => {
  const originalModule = jest.requireActual(
    'app/screens/Authentication/Login/utils/utils'
  );

  return {
    __esModule: true,
    ...originalModule,
  };
});
const validateMockProps = {
  password: '',
  email: '',
};
describe('Login utils', () => {
  const mockPassword = 'mockPassword';
  const mockPasswordMoreThan20 = 'mockPassworddddddddddd';
  const mockEmail = 'mock@gmail.com';
  const wrongEmailType = 'mockgmail.com';

  it('case when password and email empty', () => {
    const functionResult0 = validate(validateMockProps);

    expect(functionResult0?.email).toBe('Required');
    expect(functionResult0?.password).toBe('Required');
  });
  it('case when password exist but email empty', () => {
    validateMockProps.password = mockPassword;
    const functionResult0 = validate(validateMockProps);

    expect(functionResult0?.email).toBe('Required');
    expect(functionResult0?.password).toBe('');
    validateMockProps.password = '';
  });
  it('case when password empty but email exist', () => {
    validateMockProps.email = mockEmail;
    const functionResult0 = validate(validateMockProps);

    expect(functionResult0?.email).toBe('');
    expect(functionResult0?.password).toBe('Required');
    validateMockProps.email = '';
  });
  it('case when password exist and more than 20 characters but email empty', () => {
    validateMockProps.password = mockPasswordMoreThan20;
    const functionResult0 = validate(validateMockProps);

    expect(functionResult0?.email).toBe('Required');
    expect(functionResult0?.password).toBe('Must be 20 characters or less');
    validateMockProps.password = '';
  });
  it('case when password empty but email exist and invalid', () => {
    validateMockProps.email = wrongEmailType;
    const functionResult0 = validate(validateMockProps);

    expect(functionResult0?.email).toBe('Invalid email address');
    expect(functionResult0?.password).toBe('Required');
    validateMockProps.email = '';
  });
  it('case when password and email exist and correct', () => {
    validateMockProps.email = mockEmail;
    validateMockProps.password = mockPassword;
    const functionResult0 = validate(validateMockProps);

    expect(functionResult0?.email).toBeUndefined();
    expect(functionResult0?.password).toBeUndefined();
    validateMockProps.email = '';
    validateMockProps.password = '';
  });
});
