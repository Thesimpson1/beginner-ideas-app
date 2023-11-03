import React from 'react';
import { Text, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { render } from '@testing-library/react-native';

import { calcWidth } from 'app/utils/scaling-system';
import { CircleProgressBar } from 'app/components/CircleProgressBar/CircleProgressBar';
import { top } from 'app/components/CircleProgressBar/CircleProgressBar.styled';
import { colors, MainColorName } from 'app/constants/color';
const mockWithPause = jest.fn();

jest.mock('react-native-redash', () => ({
  ...jest.requireActual('react-native-redash'),
  withPause: () => mockWithPause(),
}));
describe('Circle Progress Bar', () => {
  // @ts-ignore
  let testsPause = false as SharedValue<boolean>;
  it('Should render component with required props', () => {
    const { getByTestId, getAllByTestId } = render(
      <CircleProgressBar
        isShowTimePicker={true}
        animationDuration={0}
        pause={testsPause}
      >
        <View>
          <Text>Test</Text>
        </View>
      </CircleProgressBar>
    );

    const StyledCircleProgressBarWrapperTestID = getByTestId(
      'StyledCircleProgressBarWrapperTestID'
    );
    const StyledHalfCircleTestID = getAllByTestId('StyledHalfCircleTestID')[0];
    const StyledAnimatedRightPartTestID = getByTestId(
      'StyledAnimatedRightPartTestID'
    );
    const StyledAnimatedLeftPartTestID = getByTestId(
      'StyledAnimatedLeftPartTestID'
    );
    const StyledHalfCircleTestID1 = getAllByTestId('StyledHalfCircleTestID')[1];
    const StyledHalfCircleTestID2 = getAllByTestId('StyledHalfCircleTestID')[2];
    const StyledHalfCircleTestID3 = getAllByTestId('StyledHalfCircleTestID')[3];
    const StyledBottomCircleTextWrapperTestID = getByTestId(
      'StyledBottomCircleTextWrapperTestID'
    );

    expect(StyledCircleProgressBarWrapperTestID.props).toBeTruthy();
    expect(StyledHalfCircleTestID.props.style.borderBottomColor).toBe(
      colors[MainColorName.GRAY_BLUE]
    );
    expect(
      StyledAnimatedRightPartTestID.props.animatedStyle.value.transform[1]
        .rotate
    ).toBe('0deg');
    expect(
      StyledAnimatedLeftPartTestID.props.animatedStyle.value.transform[1].rotate
    ).toBe('0deg');
    expect(StyledHalfCircleTestID1.props.style.borderBottomColor).toBe(
      colors[MainColorName.GRAY_BLUE]
    );
    expect(StyledHalfCircleTestID2.props.style.borderBottomColor).toBe(
      colors[MainColorName.GRAY_BLUE]
    );
    expect(StyledHalfCircleTestID3.props.style.borderBottomColor).toBe(
      colors[MainColorName.GRAY_BLUE]
    );
    expect(StyledBottomCircleTextWrapperTestID.props.isShowTimePicker).toBe(
      true
    );
    expect(StyledBottomCircleTextWrapperTestID.props.style.top).toBe(
      -(top + calcWidth(25))
    );
  });
  it('Should render component with isShowTimePicker = false', () => {
    const { getByTestId, getAllByTestId } = render(
      <CircleProgressBar
        isShowTimePicker={false}
        animationDuration={0}
        pause={testsPause}
      >
        <View>
          <Text>Test</Text>
        </View>
      </CircleProgressBar>
    );

    const StyledHalfCircleTestID = getAllByTestId('StyledHalfCircleTestID')[0];
    const StyledHalfCircleTestID1 = getAllByTestId('StyledHalfCircleTestID')[1];
    const StyledHalfCircleTestID2 = getAllByTestId('StyledHalfCircleTestID')[2];
    const StyledHalfCircleTestID3 = getAllByTestId('StyledHalfCircleTestID')[3];
    const StyledBottomCircleTextWrapperTestID = getByTestId(
      'StyledBottomCircleTextWrapperTestID'
    );

    expect(StyledHalfCircleTestID.props.style.borderBottomColor).toBe(
      colors[MainColorName.ORANGE]
    );
    expect(StyledHalfCircleTestID1.props.style.borderBottomColor).toBe(
      colors[MainColorName.GRAY_BLUE]
    );
    expect(StyledHalfCircleTestID2.props.style.borderBottomColor).toBe(
      colors[MainColorName.ORANGE]
    );
    expect(StyledHalfCircleTestID3.props.style.borderBottomColor).toBe(
      colors[MainColorName.GRAY_BLUE]
    );
    expect(StyledBottomCircleTextWrapperTestID.props.isShowTimePicker).toBe(
      false
    );
    expect(StyledBottomCircleTextWrapperTestID.props.style.top).toBe(-top);
  });
  it('Should render component with required props', () => {
    const { getByTestId, getAllByTestId } = render(
      <CircleProgressBar
        isShowTimePicker={false}
        animationDuration={30}
        pause={testsPause}
      >
        <View>
          <Text>Test</Text>
        </View>
      </CircleProgressBar>
    );

    expect(mockWithPause).toHaveBeenCalledTimes(1);
  });
});
