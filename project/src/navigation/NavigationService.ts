import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/core';
import { RootStackParamList } from './types';

export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}