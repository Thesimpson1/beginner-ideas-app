import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { EmailIcon } from 'app/assets/icon';
import { CustomInput } from 'app/components/CustomInput/CustomInput';

describe('Custom Input', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();
  const mockValue = 'Test Value';
  const mockPlaceholder = 'Test placeholder';
  const mockIcon = <EmailIcon testID={'EmailIconTest'} />;
  const mockError = 'Test Error';
  it('Should render correct with only required props', () => {
    const { getByTestId } = render(
      <CustomInput onChangeText={mockOnChange} value={mockValue} />
    );

    const StyledCustomInputTest = getByTestId('StyledCustomInputTest');
    const PasswordIconTest = getByTestId('PasswordIconTest');
    const StyledErrorTextTest = getByTestId('StyledErrorTextTest').props;
    const StyledCustomInputContainerTest = getByTestId(
      'StyledCustomInputContainerTest'
    ).props;

    fireEvent.changeText(StyledCustomInputTest, 'test');

    expect(StyledCustomInputContainerTest.children).toBeTruthy();
    expect(mockOnChange).toHaveBeenCalledWith('test');
    expect(StyledCustomInputTest.props.value).toBe(mockValue);
    expect(StyledCustomInputTest.props.secureTextEntry).toBe(false);
    // @ts-ignore
    expect(PasswordIconTest._fiber.type).toBe('PasswordIcon.svg');
    expect(StyledErrorTextTest.children).toBeUndefined();
  });
  it('Should render correct', () => {
    const { getByTestId } = render(
      <CustomInput
        onChangeText={mockOnChange}
        value={mockValue}
        onBlur={mockOnBlur}
        placeholder={mockPlaceholder}
        icon={mockIcon}
        isPassword={true}
        error={mockError}
      />
    );

    const StyledCustomInputTest = getByTestId('StyledCustomInputTest');
    const StyledErrorTextTest = getByTestId('StyledErrorTextTest').props;
    const StyledRightIconWrapperTest = getByTestId(
      'StyledRightIconWrapperTest'
    );
    const EyeIconTest = getByTestId('EyeIconTest');
    const EmailIconTest = getByTestId('EmailIconTest');
    const StyledCustomInputContainerTest = getByTestId(
      'StyledCustomInputContainerTest'
    ).props;
    expect(StyledCustomInputTest.props.secureTextEntry).toBe(true);
    fireEvent(StyledCustomInputTest, 'blur');

    fireEvent.press(StyledRightIconWrapperTest);

    expect(StyledCustomInputContainerTest.children).toBeTruthy();
    expect(StyledErrorTextTest.children).toBe(mockError);
    expect(mockOnBlur).toHaveBeenCalled();
    expect(StyledCustomInputTest.props.placeholder).toBe(mockPlaceholder);
    expect(StyledCustomInputTest.props.secureTextEntry).toBe(false);
    // @ts-ignore
    expect(EmailIconTest._fiber.type).toBe('EmailIcon.svg');
    // @ts-ignore
    expect(EyeIconTest._fiber.type).toBe('EyeIcon.svg');
  });
});
