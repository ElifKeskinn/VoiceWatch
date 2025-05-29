import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, Animated, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorModeValue } from 'native-base';
import { Audio } from 'expo-av';
import alertSound from '../assets/alert.mp3';
import { styles } from '../styles/AlertPopup.styles';
import { sendBulkSms } from '../services/requests/alertRequests';
import { useGetContacts } from '../services/requests/contactRequests';
import { sendNotification } from '../utils/notify';
import { setAlertPopupVisible } from '../services/wsService';
import { getCurrentLocation } from '../services/locationService';

const { width } = Dimensions.get('window');

const AlertPopup = ({ visible, type, onCancel, onConfirm, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = React.useRef(null);
  const flashAnimation = React.useRef(new Animated.Value(0)).current;
  const soundRef = React.useRef(null);

  const modalBgColor = useColorModeValue('white', '#1E1E1E');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue('#F0F0F0', 'rgba(255,255,255,0.1)');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const secondaryTextColor = useColorModeValue('#888', '#B0B0B0');
  const buttonBgColor = useColorModeValue('white', '#2D2D2D');

  const { data: contacts, isLoading } = useGetContacts();
  const numbers = Array.isArray(contacts) 
    ? contacts.map(c => c.contactNumber)
    : [];

  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      Animated.sequence([
        Animated.timing(flashAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(flashAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [timeLeft]);

  // Ses yükleme fonksiyonu
  const loadSound = async () => {
    try {
      console.log('🔊 Alert sesi yükleniyor...');
      const { sound } = await Audio.Sound.createAsync(
        alertSound,
        { shouldPlay: false }
      );
      soundRef.current = sound;
      console.log('✅ Alert sesi yüklendi');
    } catch (error) {
      console.error('❌ Ses yüklenirken hata:', error);
    }
  };

  // Ses çalma fonksiyonu - volume parametresi eklendi
  const playWarningSound = async (volume = 1.0, duration = 3000) => {
    try {
      if (!soundRef.current) {
        await loadSound();
      }
      
      await soundRef.current.setPositionAsync(0);
      await soundRef.current.setVolumeAsync(volume);
      await soundRef.current.playAsync();

      // Belirtilen süre sonra sesi durdur
      setTimeout(async () => {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
        }
      }, duration);

    } catch (error) {
      console.error('❌ Ses çalınırken hata:', error);
    }
  };

  useEffect(() => {
    if (visible) {
      setTimeLeft(30);

      playWarningSound(0.5, 3000); 
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 5) {
            playWarningSound(1.0, 5000); 
          }
          
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            requestAnimationFrame(() => {
              onTimeout?.();
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (soundRef.current) {
        soundRef.current.stopAsync();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setAlertPopupVisible(false);
      setTimeLeft(30);
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setAlertPopupVisible(false);
    };
  }, [visible, onTimeout]);

  const getAlertInfo = () => {
    switch (type) {
      case 'glass_breaking':
        return {
          icon: 'broken-image',
          title: 'Cam Kırılma Sesi Algılandı!',
          color: '#FF4500',
        };
      case 'fall':
        return {
          icon: 'warning',
          title: 'Düşme Sesi Algılandı!',
          color: '#FF4500',
        };
      case 'scream':
        return {
          icon: 'record-voice-over',
          title: 'Çığlık Sesi Algılandı!',
          color: '#FF4500',
        };
      default:
        return {
          icon: 'warning',
          title: 'Bilinmeyen Tehlike!',
          color: '#FF4500',
        };
    }
  };

  const alertInfo = getAlertInfo();

  // Animasyon renkleri
  const animatedBackgroundColor = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [modalBgColor, 'rgba(255, 0, 0, 0.1)']
  });

  const animatedBorderColor = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [borderColor, 'rgba(255, 0, 0, 0.3)']
  });

  const animatedTimerColor = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [accentColor, '#FF0000']
  });

  const animatedTimerLabelColor = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [secondaryTextColor, '#FF0000']
  });

  const animatedCancelButtonBorderColor = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [accentColor, '#FF0000']
  });

  const animatedCancelButtonTextColor = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [accentColor, '#FF0000']
  });

  const animatedCancelButtonBgColor = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [buttonBgColor, 'rgba(255, 0, 0, 0.1)']
  });

  // SMS gönderme fonksiyonu
  const sendAlertSms = async () => {
    try {
      if (isLoading) {
        console.log('❌ Kontaklar yükleniyor');
        await sendNotification(
          { enabled: true, sound: true, vibration: true },
          'SMS Gönderilemedi',
          'Kontaklar henüz yükleniyor, lütfen bekleyin.'
        );
        return false;
      }

      if (!numbers?.length) {
        console.log('❌ Gönderilecek kontak yok');
        await sendNotification(
          { enabled: true, sound: true, vibration: true },
          'SMS Gönderilemedi',
          'Kayıtlı kontak bulunamadı.'
        );
        return false;
      }

      const location = await getCurrentLocation();
      const alertInfo = getAlertInfo();
      const message = `${alertInfo.title} - Otomatik acil durum bildirimi!${
        location?.mapsLink ? `\n\nKonum: ${location.mapsLink}` : ''
      }`;

      await sendBulkSms(message, numbers);
      console.log('✅ SMS gönderimi başarılı');

      // Başarılı bildirim
      await sendNotification(
        { enabled: true, sound: true, vibration: true },
        '✅ SMS Gönderildi',
        'Kontaklar başarıyla bilgilendirildi.'
      );

      return true;
    } catch (err) {
      console.error('❌ SMS gönderme hatası:', err);
      
      // Hata bildirimi
      await sendNotification(
        { enabled: true, sound: true, vibration: true },
        '❌ SMS Gönderilemedi',
        'SMS gönderimi sırasında bir hata oluştu.'
      );
      
      return false;
    }
  };

  // Kontakları bilgilendir butonunu güncelle
  const handleConfirm = async () => {
    const success = await sendAlertSms();
    if (success) {
      onConfirm?.();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.alertBox,
            {
              backgroundColor: timeLeft <= 5 ? animatedBackgroundColor : modalBgColor,
              borderColor: timeLeft <= 5 ? animatedBorderColor : borderColor,
              borderWidth: 1,
            },
          ]}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <MaterialIcons
                name={alertInfo.icon}
                size={24}
                color={accentColor}
                style={styles.headerIcon}
              />
              <Text style={[styles.title, {color: textColor}]}>
                {alertInfo.title}
              </Text>
            </View>
            
            <View style={[styles.divider, {backgroundColor: borderColor}]} />
            
            <Animated.View
              style={[
                styles.timerContainer,
                {
                  backgroundColor: timeLeft <= 5 ? animatedBackgroundColor : modalBgColor,
                  borderColor: timeLeft <= 5 ? animatedBorderColor : borderColor,
                },
              ]}>
              <Animated.Text 
                style={[
                  styles.timerText, 
                  {color: timeLeft <= 5 ? animatedTimerColor : accentColor}
                ]}>
                {timeLeft}
              </Animated.Text>
              <Animated.Text 
                style={[
                  styles.timerLabel, 
                  {color: timeLeft <= 5 ? animatedTimerLabelColor : secondaryTextColor}
                ]}>
                saniye
              </Animated.Text>
            </Animated.View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onCancel}
                style={[
                  styles.button,
                  styles.cancelButton,
                  {
                    backgroundColor: timeLeft <= 5 ? animatedCancelButtonBgColor : buttonBgColor,
                    borderColor: timeLeft <= 5 ? animatedCancelButtonBorderColor : accentColor,
                  },
                ]}>
                <Animated.Text 
                  style={[
                    styles.cancelButtonText, 
                    {color: timeLeft <= 5 ? animatedCancelButtonTextColor : accentColor}
                  ]}>
                  İptal Et
                </Animated.Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                style={[
                  styles.button,
                  styles.confirmButton,
                  {backgroundColor: accentColor},
                ]}>
                <MaterialIcons
                  name="notification-important"
                  size={20}
                  color="white"
                  style={styles.buttonIcon}
                />
                <Text style={styles.confirmButtonText}>
                  Kontakları Bilgilendir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AlertPopup;