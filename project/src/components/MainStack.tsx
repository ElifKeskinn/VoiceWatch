import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { SplashScreen } from "./screens/SplashScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate splash screen delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <BaseNavigationContainer>
      <StackNavigator.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#65adf1",
          },
          headerTintColor: "white",
        }}
      >
        <StackNavigator.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: "Giriş Yap" }}
        />
        <StackNavigator.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Kayıt Ol" }}
        />
        <StackNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "VoiceWatch" }}
        />
        <StackNavigator.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Ayarlar" }}
        />
        <StackNavigator.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profil" }}
        />
      </StackNavigator.Navigator>
    </BaseNavigationContainer>
  );
};