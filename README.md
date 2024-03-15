
# About Project
This project  shows some of my skills:
 1. There are a lot of animation (used [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) and [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler))
 2. There are unit test. All application is covered by more than 90%(used [Jest](https://jestjs.io/)). 
 3. Implemented understandable structure with using Redux toolkit and Redux saga.
 4. Connected error tracker(used [sentry](https://sentry.io/welcome/?utm_source=google&utm_medium=cpc&utm_id=%7B20398270056%7D&utm_campaign=Google_Search_Brand_SentryKW_EMEA_Alpha&utm_content=g&utm_term=sentry&gad_source=1&gclid=Cj0KCQjw-r-vBhC-ARIsAGgUO2DbPRcknbicMtLrt04l5cJLcMi9iBmDaT7wNuoIvgXMskNmK0KlXOgaApwMEALw_wcB))
 5. There is simple scale system.
 6. Was connected [firebase](https://console.firebase.google.com/) for storing some information and authorisation. 
 7. Was added navigator for [navigation](https://reactnavigation.org/) between screens.
 8. Was added e2e tests(used [detox](https://github.com/wix/Detox)).
 9. This project also has additional typeScript and Lint configurations.

This project as well has a board with tasks(To do, doing, done, deleted, tasks with problem) and worklog.
# Run project 
## Step 1: Set up Environment 
Set up environment according react native documentation https://reactnative.dev/docs/environment-setup
## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run  app — you can also run it directly from within Android Studio and Xcode respectively.

