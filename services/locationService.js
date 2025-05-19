import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Konum İzni Gerekli',
        'Uygulamanın düzgün çalışması için konum iznine ihtiyacı var.',
        [{ text: 'Tamam' }]
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error('Konum izni alınırken hata:', error);
    return false;
  }
};

const generateGoogleMapsLink = (latitude, longitude) => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};

export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return null;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;
    const mapsLink = generateGoogleMapsLink(latitude, longitude);

    console.log('📍 Konum bilgisi:', {
      latitude,
      longitude,
      accuracy: location.coords.accuracy,
      timestamp: new Date(location.timestamp).toLocaleString(),
    });

    console.log('🗺️ Google Maps Linki:', mapsLink);

    return {
      ...location,
      mapsLink
    };
  } catch (error) {
    console.error('Konum alınırken hata:', error);
    return null;
  }
};