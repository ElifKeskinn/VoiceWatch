import { Application } from '@nativescript/core';
import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { AppContainer } from './navigation/AppContainer';
import { registerElements } from './utils/register-elements';

// Register custom elements
registerElements();

Application.run({
  create: () => {
    return ReactNativeScript.start(React.createElement(AppContainer));
  },
});