import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Tabs } from 'app/screens/Authentication/Login/components/Tabs/Tabs';

describe('Tabs component', () => {
  const mockButtonsList = ['Test one', 'Test two'];
  const setCurrentIndex = jest.fn();

  it('Should render component', () => {
    const { getAllByTestId, getByTestId } = render(
      <Tabs
        setCurrentIndex={setCurrentIndex}
        currentIndex={0}
        buttonList={mockButtonsList}
      />
    );

    const StyledTabsContainerTestID = getByTestId(
      'StyledTabsContainerTestID'
    ).props;
    const StyledButtonWrapperTestID1 = getAllByTestId(
      'StyledButtonWrapperTestID'
    )[0].props;
    const StyledButtonWrapperTestID2 = getAllByTestId(
      'StyledButtonWrapperTestID'
    )[1].props;
    const TabsSimpleButton = getAllByTestId('TabsSimpleButton')[1];

    fireEvent.press(TabsSimpleButton);

    expect(StyledTabsContainerTestID.children).toBeTruthy();

    expect(StyledButtonWrapperTestID1.isCurrentIndex).toBe(true);

    expect(StyledButtonWrapperTestID2.isCurrentIndex).toBe(false);

    expect(StyledButtonWrapperTestID1.style.borderBottomWidth).toBe(2);

    expect(StyledButtonWrapperTestID2.style.borderBottomWidth).toBe(0);

    expect(setCurrentIndex).toHaveBeenCalledTimes(1);
  });
  it('Should render correctly', () => {
    const { getAllByTestId } = render(
      <Tabs
        setCurrentIndex={setCurrentIndex}
        currentIndex={1}
        buttonList={mockButtonsList}
      />
    );

    const StyledButtonWrapperTestID1 = getAllByTestId(
      'StyledButtonWrapperTestID'
    )[0].props;
    const StyledButtonWrapperTestID2 = getAllByTestId(
      'StyledButtonWrapperTestID'
    )[1].props;

    expect(StyledButtonWrapperTestID1.isCurrentIndex).toBe(false);

    expect(StyledButtonWrapperTestID2.isCurrentIndex).toBe(true);

    expect(StyledButtonWrapperTestID1.style.borderBottomWidth).toBe(0);

    expect(StyledButtonWrapperTestID2.style.borderBottomWidth).toBe(2);
  });
});
