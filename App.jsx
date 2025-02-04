import React from 'react';
import {NativeBaseProvider, useColorModeValue} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import TabNavigator from './components/common/Navbar';
import PasswordChangeScreen from './screens/Settings/PasswordChangeScreen';
import DeleteAccountScreen from './screens/Settings/DeleteAccountScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const headerBgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const headerTintColor = useColorModeValue('#FF4500', '#FF6347');
  const headerBorderColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,255,255,0.1)');

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChangeScreen}
        options={{
          title: 'Şifre Değiştir',
          headerTintColor: headerTintColor,
          headerStyle: {
            backgroundColor: headerBgColor,
            borderBottomWidth: 1,
            borderBottomColor: headerBorderColor,
            elevation: 0, // Android için gölgeyi kaldır
            shadowOpacity: 0, // iOS için gölgeyi kaldır
          },
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          title: 'Hesabı Sil',
          headerTintColor: headerTintColor,
          headerStyle: {
            backgroundColor: headerBgColor,
            borderBottomWidth: 1,
            borderBottomColor: headerBorderColor,
            elevation: 0, // Android için gölgeyi kaldır
            shadowOpacity: 0, // iOS için gölgeyi kaldır
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
