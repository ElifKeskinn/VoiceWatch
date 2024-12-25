import { registerElement } from 'react-nativescript';

export function registerElements() {
  const elements = {
    frame: () => require('@nativescript/core').Frame,
    stackLayout: () => require('@nativescript/core').StackLayout,
    flexboxLayout: () => require('@nativescript/core').FlexboxLayout,
    scrollView: () => require('@nativescript/core').ScrollView,
    button: () => require('@nativescript/core').Button,
    textField: () => require('@nativescript/core').TextField,
    label: () => require('@nativescript/core').Label,
    image: () => require('@nativescript/core').Image,
    switch: () => require('@nativescript/core').Switch,
    slider: () => require('@nativescript/core').Slider,
    gridLayout: () => require('@nativescript/core').GridLayout,
    absoluteLayout: () => require('@nativescript/core').AbsoluteLayout
  };

  Object.entries(elements).forEach(([name, getView]) => {
    registerElement(name, () => getView(), { overwriteExisting: true });
  });
}