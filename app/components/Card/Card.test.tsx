import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { HomeStackScreenName } from 'app/types';

import { EmailIcon } from 'app/assets/icon';
import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { Card } from 'app/components/Card/Card';
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
describe('Card component', () => {
  const mockTitle = HomeStackScreenName.CALCULATOR;
  const mockIcon = <EmailIcon testID={'EmailIconTest'} />;
  it('Should render correct', () => {
    const { getByTestId } = renderWithProviders(<Card />);

    const CardTestID = getByTestId('CardTestID');
    const StyledCardTitleTextTestID = getByTestId(
      'StyledCardTitleTextTestID'
    ).props;
    const NoteIconTest = getByTestId('NoteIconTest');

    fireEvent.press(CardTestID);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(HomeStackScreenName.HOME);

    expect(StyledCardTitleTextTestID.children).toBe(HomeStackScreenName.HOME);
    // @ts-ignore
    expect(NoteIconTest._fiber.type).toBe('NoteIcon.svg');
  });
  it('Should render correct with props', () => {
    const { getByTestId } = renderWithProviders(
      <Card title={mockTitle} icon={mockIcon} />
    );

    const CardTestID = getByTestId('CardTestID');
    const StyledCardTitleTextTestID = getByTestId(
      'StyledCardTitleTextTestID'
    ).props;
    const EmailIconTest = getByTestId('EmailIconTest');

    fireEvent.press(CardTestID);
    expect(mockedNavigate).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenCalledWith(HomeStackScreenName.CALCULATOR);

    expect(StyledCardTitleTextTestID.children).toBe(
      HomeStackScreenName.CALCULATOR
    );
    // @ts-ignore
    expect(EmailIconTest._fiber.type).toBe('EmailIcon.svg');
  });
});
