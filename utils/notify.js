import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';

/**
 * Kullanıcı ayarlarına göre sistem bildirimi gönderir
 * @param {object} settings - Kullanıcının bildirim ayarları
 * @param {string} title - Bildirim başlığı
 * @param {string} body - Bildirim mesajı
 */
export const sendNotification = async (settings, title, body) => {
  if (!settings.enabled || settings.silent) {
    console.log('🔕 Bildirim gönderilmedi (sessiz modda ya da kapalı).');
    return;
  }

  if (settings.vibration) {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: settings.sound ? 'default' : undefined,
    },
    trigger: null, // hemen gönder
  });

  console.log('✅ Bildirim gönderildi:', title, body);
  // alert çağrısını kaldırdık
};
