/**
 * @format
 */
import { BackHandler } from 'react-native';
import * as Notifications from 'expo-notifications';

if (BackHandler.removeEventListener === undefined) {
  BackHandler.removeEventListener = () => {};
}

import { registerRootComponent } from 'expo';
import App from './App';

async function setUpNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('vibrate-channel', {
      name: 'Vibration notifications',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 500, 200, 500],
      enableVibrate: true,
    });

    await Notifications.setNotificationChannelAsync('default-channel', {
      name: 'Default notifications',
      importance: Notifications.AndroidImportance.HIGH,
      enableVibrate: false,
    });
  }
}

setUpNotifications();

registerRootComponent(App);
