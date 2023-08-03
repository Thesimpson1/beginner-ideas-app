/**
 * @format
 */

import { AppRegistry } from 'react-native';
import * as Sentry from '@sentry/react-native';

import { name as appName } from './app.json';
import App from './app/App';

Sentry.init({
  dsn: 'https://d2e1bef0b9f540899f6abc06b60e45aa@o4505641470263296.ingest.sentry.io/4505641471901696',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});
AppRegistry.registerComponent(appName, () => App);
