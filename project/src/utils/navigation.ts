import { Frame } from '@nativescript/core';

export function navigateToScreen(screenName: string, context?: any) {
  const frame = Frame.topmost();
  if (frame) {
    frame.navigate({
      moduleName: `components/screens/${screenName}`,
      context
    });
  }
}

export function goBack() {
  const frame = Frame.topmost();
  if (frame) {
    frame.goBack();
  }
}