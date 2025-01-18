// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;