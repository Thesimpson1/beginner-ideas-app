import { captureException } from '@sentry/react-native';

import { sentryMainError } from './sentryEvents';
jest.mock('@sentry/react-native');

const mockSentry = { captureException };
const spy = jest
  .spyOn(mockSentry, 'captureException')
  .mockImplementation(() => 'message');

describe('sentryEvents', () => {
  describe('sentryMainError', () => {
    it('send error to sentry when any input is set', () => {
      sentryMainError({
        name: 'name',
        message: 'message',
      });

      expect(spy).toHaveBeenCalled();
    });
  });
});
