import NotificationSounds from 'react-native-notification-sounds';

export const fetchSounds = () =>
  NotificationSounds.getNotifications('ringtone');
