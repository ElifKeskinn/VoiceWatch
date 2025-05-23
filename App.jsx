import React, { useEffect } from 'react'; 
import {NativeBaseProvider, useColorModeValue, Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import TabNavigator from './components/common/Navbar';
import PasswordChangeScreen from './screens/Settings/PasswordChangeScreen';
import DeleteAccountScreen from './screens/Settings/DeleteAccountScreen';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { requestLocationPermission, getCurrentLocation, startLocationTracking, stopLocationTracking } from './services/locationService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // 🔔 ekranda göster
    shouldPlaySound: true,   // 🔊 ses çıkar
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

const AppNavigator = () => {
  const headerBgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const headerTintColor = useColorModeValue('#FF4500', '#FF6347');
  const headerBorderColor = useColorModeValue(
    'rgba(255,69,0,0.1)',
    'rgba(255,255,255,0.1)',
  );

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
            elevation: 0,
            shadowOpacity: 0,
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
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};

// React Query client'ı oluştur
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const initializeApp = async () => {
      // Bildirim izinlerini al
      const { status: notificationStatus } = await Notifications.getPermissionsAsync();
      if (notificationStatus !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }

      // Konum izinlerini al ve konumu al
      await requestLocationPermission();
      const location = await getCurrentLocation();
      if (location) {
        console.log('📍 Uygulama başlatıldığında konum alındı:', {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      }

      // Periyodik konum takibini başlat
      await startLocationTracking();
    };

    initializeApp();

    // Cleanup function
    return () => {
      // Component unmount olduğunda konum takibini durdur
      stopLocationTracking();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavigator />
          <Box position="absolute" width="100%">
            <Toast />
          </Box>
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};

export default App;
