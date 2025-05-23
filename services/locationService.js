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

let locationSubscription = null;
let lastLogTime = 0;
const MIN_LOG_INTERVAL = 5 * 60 * 1000; // 5 dakika

export const startLocationTracking = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    // Önce mevcut aboneliği temizle
    if (locationSubscription) {
      locationSubscription.remove();
    }

    // Her 5 dakikada bir konum güncellemesi al
    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5 * 60 * 1000, // 5 dakika
        distanceInterval: 50, // 50 metre
      },
      (location) => {
        const currentTime = Date.now();
        
        // Son logdan bu yana en az 5 dakika geçtiyse logla
        if (currentTime - lastLogTime >= MIN_LOG_INTERVAL) {
          const { latitude, longitude } = location.coords;
          const mapsLink = generateGoogleMapsLink(latitude, longitude);

          console.log('📍 Periyodik Konum Güncellemesi:', {
            latitude,
            longitude,
            accuracy: location.coords.accuracy,
            timestamp: new Date(location.timestamp).toLocaleString(),
          });

          console.log('🗺️ Periyodik Google Maps Linki:', mapsLink);
          
          lastLogTime = currentTime;
        }
      }
    );

    console.log('📍 Konum takibi başlatıldı');
  } catch (error) {
    console.error('Konum takibi başlatılırken hata:', error);
  }
};

export const stopLocationTracking = () => {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
    console.log('📍 Konum takibi durduruldu');
  }
};