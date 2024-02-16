jest.mock('@react-native-firebase/auth');
// jest.mock('react-native-gesture-handler');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@react-navigation/stack');
require('react-native-reanimated').setUpTests();
import 'react-native-gesture-handler/jestSetup';
