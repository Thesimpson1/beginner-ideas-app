import React from 'react';
import {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';
import { fireEvent, render } from '@testing-library/react-native';
import { mockInitialState, mockInitialTimerState } from 'app/mocks';
import { SoundsItem } from 'app/redux/timer/slice';

import { renderWithProviders } from 'app/utils/test-utils/renderWithProviders';
import { ChangeSoundModal } from 'app/screens/Timer/components/ChangeSoundModal/ChangeSoundModal';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useDispatch: () => mockDispatch,
  };
});

const mockPlaySampleSound = jest.fn();
const mockStopSampleSound = jest.fn();

jest.mock('react-native-notification-sounds', () => ({
  ...jest.requireActual('react-native-notification-sounds'),
  stopSampleSound: () => mockStopSampleSound(),
  playSampleSound: () => mockPlaySampleSound(),
}));
describe('Change Sound Modal', () => {
  const onCloseMock = jest.fn();
  const mockSounds = [{ title: 'Test1' }, { title: 'Test2' }] as SoundsItem[];
  it('Should not render', () => {
    const { getByTestId } = renderWithProviders(
      <ChangeSoundModal onClose={onCloseMock} isVisible={false} />
    );

    const ModalTestID = getByTestId('ModalTestID');
    expect(ModalTestID.props.visible).toBe(false);
  });
  it('Should invoke correct methods when on click on buttons', () => {
    mockInitialTimerState.notificationSounds = mockSounds;
    const { getByTestId } = renderWithProviders(
      <ChangeSoundModal onClose={onCloseMock} isVisible={true} />,
      {
        preloadedState: {
          timer: mockInitialTimerState,
        },
      }
    );
    const ModalTestID = getByTestId('ModalTestID');
    const SimpleButtonClosedTestID = getByTestId('SimpleButtonClosedTestID');
    const SimpleButtonSetTestID = getByTestId('SimpleButtonSetTestID');

    expect(ModalTestID.props.visible).toBe(true);

    fireEvent.press(SimpleButtonClosedTestID);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(mockStopSampleSound).toHaveBeenCalledTimes(2);

    fireEvent.press(SimpleButtonSetTestID);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockStopSampleSound).toHaveBeenCalledTimes(3);
    expect(onCloseMock).toHaveBeenCalledTimes(2);
    expect(onCloseMock).toHaveBeenCalledWith(false);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: mockSounds[0],
      type: 'timer/setCurrentSound',
    });
  });
  it('Should invoke correct methods without sounds', () => {
    mockInitialTimerState.notificationSounds = null;
    const { getByTestId } = renderWithProviders(
      <ChangeSoundModal onClose={onCloseMock} isVisible={true} />,
      {
        preloadedState: {
          timer: mockInitialTimerState,
        },
      }
    );
    const SimpleButtonSetTestID = getByTestId('SimpleButtonSetTestID');

    fireEvent.press(SimpleButtonSetTestID);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockStopSampleSound).toHaveBeenCalledTimes(4);
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
});
