interface FrameStateI {
  password: string;
  email: string;
}
export const validate = (values: FrameStateI) => {
  const errors: FrameStateI = {
    password: '',
    email: '',
  };
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // we check here all states, if we have no error we will return false
  const isError = !!errors.email && errors.password;
  return isError ? errors : undefined;
};
