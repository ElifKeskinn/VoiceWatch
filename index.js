/**
 * @format
 */
import { BackHandler } from 'react-native';

if (BackHandler.removeEventListener === undefined) {
  BackHandler.removeEventListener = () => {};
}

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
