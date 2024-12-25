import * as React from "react";
import { BaseNavigationContainer } from '@react-navigation/core';
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { SignInScreen } from "../components/screens/SignInScreen";
import { SignUpScreen } from "../components/screens/SignUpScreen";
import { HomeScreen } from "../components/screens/HomeScreen";
import { SettingsScreen } from "../components/screens/SettingsScreen";
import { ProfileScreen } from "../components/screens/ProfileScreen";
import { navigationRef } from './NavigationService';
import { RootStackParamList } from './types';

const Stack = stackNavigatorFactory();

export function AppContainer() {
  return (
    <BaseNavigationContainer ref={navigationRef}>
      <Stack.Navigator<RootStackParamList>
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#65adf1",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Kayıt Ol" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "VoiceWatch" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Ayarlar" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profil" }}
        />
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
}