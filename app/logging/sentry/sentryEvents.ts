import { captureException } from '@sentry/react-native';
export function sentryMainError(error: Error) {
  captureException(new Error(error.message));
}
