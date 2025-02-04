import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import TabNavigator from './components/common/Navbar';
import PasswordChangeScreen from './screens/Settings/PasswordChangeScreen';
import DeleteAccountScreen from './screens/Settings/DeleteAccountScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
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
              headerTintColor: '#FF4500',
              headerStyle: {
                backgroundColor: '#FFFAF0',
              },
            }}
          />
          <Stack.Screen
            name="DeleteAccount"
            component={DeleteAccountScreen}
            options={{
              title: 'Hesabı Sil',
              headerTintColor: '#FF4500',
              headerStyle: {
                backgroundColor: '#FFFAF0',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
