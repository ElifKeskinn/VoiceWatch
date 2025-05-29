// hooks/useRegisterDeviceToken.js
import {useCallback} from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import useFetchWithToken from '../services/apiService';

export const useRegisterDeviceToken = () => {
  const {execute} = useFetchWithToken();

  const registerDeviceToken = useCallback(async () => {
    const isPhysical = Constants?.isDevice ?? true; // undefined'e düşerse bile true kabul et

    if (!isPhysical) {
      console.warn(
        'isDevice = false, ama işlem devam ediyor (Expo Go olabilir)',
      );
    }

    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Bildirim izni verilmedi');
      return;
    }

    // Uygulamayi canliya alinca bu satiri degistir cunku bu sadece expo go da calisir

    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    const deviceToken = tokenData.data;
    console.log('📱 Alınan deviceToken:', deviceToken);

    // ✅ Backend'e gönder
    const response = await execute('POST', 'user/update-device-token', {
      deviceToken,
    });

    console.log('✅ Backend cevabı:', response.message);
  }, [execute]);

  return {registerDeviceToken};
};
