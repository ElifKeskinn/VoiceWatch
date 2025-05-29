import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import {Platform} from 'react-native';

// Global bildirim ayarlarını güncelle
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Kullanıcı ayarlarına göre sistem bildirimi gönderir
 * @param {object} settings - Kullanıcının bildirim ayarları
 * @param {string} title - Bildirim başlığı
 * @param {string} body - Bildirim mesajı
 */
export const sendNotification = async (settings, title, body) => {
  if (!settings.enabled) {
    console.log('🔕 Bildirimler devre dışı');
    return;
  }

  try {
    // Sadece titreşim isteniyorsa
    if (settings.vibration && !settings.sound) {
      // iOS için Haptics
      if (Platform.OS === 'ios') {
        try {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error,
          );
          await new Promise(resolve => setTimeout(resolve, 500));
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error,
          );
        } catch (error) {
          console.error('Haptic feedback hatası:', error);
        }
      }
    }

    // Bildirim ayarlarını hazırla
    const notificationContent = {
      title,
      body,
      // Android için özel ayarlar
      android: {
        channelId: settings.vibration ? 'vibrate-channel' : 'default-channel',
        sound: settings.sound,
        vibrate: settings.vibration ? [0, 500, 200, 500] : null,
        priority: Notifications.AndroidImportance.HIGH,
        enableVibrate: settings.vibration,
      },
      // iOS için özel ayarlar
      ios: {
        sound: settings.sound,
      },
      sound: settings.sound,
    };

    // Bildirimi gönder
    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: null, // Anında gönder
    });

    console.log('✅ Bildirim gönderildi:', {
      title,
      settings: {
        sound: settings.sound,
        vibration: settings.vibration,
      },
    });
  } catch (error) {
    console.error('❌ Bildirim hatası:', error);
  }
};

// Bildirim izinlerini kontrol et ve iste
export const requestNotificationPermissions = async () => {
  try {
    // Önce ses izni al
    await Audio.requestPermissionsAsync();

    // Sonra bildirim izinlerini al
    const {status} = await Notifications.requestPermissionsAsync({
      ios: {
        allowSound: true,
        allowAlert: true,
        allowBadge: false,
        allowAnnouncements: true,
        allowCriticalAlerts: true, // Önemli bildirimler için
      },
      android: {
        allowSound: true,
        allowVibrate: true,
        allowLight: true,
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
      },
    });

    if (status !== 'granted') {
      console.warn('⚠️ Bildirim izni verilmedi');
    }

    return status === 'granted';
  } catch (error) {
    console.error('❌ Bildirim izni hatası:', error);
    return false;
  }
};
