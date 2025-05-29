import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, Platform} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {MaterialIcons} from '@expo/vector-icons';
import AlertPopup from '../components/AlertPopup';
import {setPaused} from '../services/wsService';
import {
  connectWS,
  startSendingAudio,
  onAIResult,
  disconnectWS,
} from '../services/wsService';
import useFetchWithToken from '../services/apiService';
import Constants from 'expo-constants';
import {useColorModeValue} from 'native-base';
import Logo from '../components/common/Logo';
import ManualAlertPopup from '../components/ManualAlertPopup';
import {styles} from '../styles/Home.styles';
import {sendManualAlert, sendBulkSms} from '../services/requests/alertRequests';
import {useGetContacts} from '../services/requests/contactRequests';
import {sendNotification} from '../utils/notify';

const HomeScreen = () => {
  const {getToken, execute} = useFetchWithToken();
  const [isListening, setIsListening] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const scale = useSharedValue(1);
  const ring1Scale = useSharedValue(1);
  const ring2Scale = useSharedValue(1);
  const ring3Scale = useSharedValue(1);
  const [showManualAlert, setShowManualAlert] = useState(false);

  // Alert timer'ı için useRef kullanıyoruz
  const alertTimer = React.useRef(null);
  // Kontakları al
  const {data: contacts, isLoading: loadingContacts} = useGetContacts();
  const contactNumbers = React.useMemo(() => {
    return Array.isArray(contacts) ? contacts.map(c => c.contactNumber) : [];
  }, [contacts]);

  // Dark mod renkleri
  const bgColor = useColorModeValue('#FFFAF0', '#121212');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const buttonBgColor = useColorModeValue('#FF4500', '#FF6347');
  const descBgColor = useColorModeValue('#FFF8F0', '#1E1E1E');
  const descBorderColor = useColorModeValue(
    'rgba(255,69,0,0.15)',
    'rgba(255,255,255,0.1)',
  );
  const iconBgColor = useColorModeValue(
    'rgba(255,69,0,0.1)',
    'rgba(255,99,71,0.15)',
  );
  const secondaryTextColor = useColorModeValue('#666666', '#B0B0B0');
  useEffect(() => {
    console.log('showManualAlert değişti:', showManualAlert);
  }, [showManualAlert]);

  // Update animation configuration
  const animateRing = (ringScale, delay = 0, maxScale = 1.8) => {
    'worklet';
    ringScale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(maxScale, {duration: 1000, useNativeDriver: true}),
          withTiming(1, {duration: 1000, useNativeDriver: true}),
        ),
        -1,
      ),
    );
  };

  // Update animated styles
  const ring1Style = useAnimatedStyle(
    () => ({
      transform: [{scale: ring1Scale.value}],
      opacity: withTiming(isListening ? 0.2 : 0, {useNativeDriver: true}),
    }),
    [isListening],
  );

  const ring2Style = useAnimatedStyle(
    () => ({
      transform: [{scale: ring2Scale.value}],
      opacity: withTiming(isListening ? 0.15 : 0, {useNativeDriver: true}),
    }),
    [isListening],
  );

  const ring3Style = useAnimatedStyle(
    () => ({
      transform: [{scale: ring3Scale.value}],
      opacity: withTiming(isListening ? 0.1 : 0, {useNativeDriver: true}),
    }),
    [isListening],
  );

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }), []);

  // --- MANUEL UYARI CALLBACK’LERİ ---
  const onManualConfirm = async () => {
    setShowManualAlert(false);

    if (loadingContacts) {
      return Alert.alert('Bekleyin', 'Kontaklar yükleniyor…');
    }
    if (!contactNumbers.length) {
      return Alert.alert('Hata', 'Kontak bulunamadı');
    }

    try {
      // 1) Alert kaydı
      await sendManualAlert();
      // 2) SMS
      await sendBulkSms('Manuel acil durum bildirimi!', contactNumbers);
      Alert.alert('Başarılı', 'SMS’ler gönderildi.');
    } catch (err) {
      Alert.alert('Hata', err.message);
    }
  };

  const startAnimation = () => {
    'worklet';
    animateRing(ring1Scale, 0, 1.8);
    animateRing(ring2Scale, 200, 1.85);
    animateRing(ring3Scale, 400, 1.9);
    scale.value = withSpring(0.95, {useNativeDriver: true});
  };

  const stopAnimation = () => {
    'worklet';
    ring1Scale.value = withTiming(1, {useNativeDriver: true});
    ring2Scale.value = withTiming(1, {useNativeDriver: true});
    ring3Scale.value = withTiming(1, {useNativeDriver: true});
    scale.value = withSpring(1, {useNativeDriver: true});
  };

  const handleAlertCancel = useCallback(async () => {
    setShowAlert(false);
    setAlertType(null);
    setPaused(false);

    // Alert kapandıktan sonra ses dinlemeyi tekrar başlat
    console.log('🔄 Ses dinleme yeniden başlatılıyor...');
    const token = await getToken();
    startSendingAudio(token, 2000);
  }, []);

  const handleAlertConfirm = useCallback(async () => {
    console.log('✅ Kontaklar bilgilendiriliyor...');
    setShowAlert(false);
    setAlertType(null);
    setPaused(false);

    // Alert kapandıktan sonra ses dinlemeyi tekrar başlat
    console.log('🔄 Ses dinleme yeniden başlatılıyor...');
    const token = await getToken();
    startSendingAudio(token, 2000);
  }, []);

  const handleAlertTimeout = useCallback(async () => {
    try {
      console.log('⏰ Alert süresi doldu, SMS gönderiliyor...');
      
      if (loadingContacts) {
        console.log('⚠️ Kontaklar yükleniyor');
        return;
      }

      if (!contactNumbers?.length) {
        console.log('❌ Gönderilecek kontak yok');
        await sendNotification(
          { enabled: true, sound: true, vibration: true },
          '❌ SMS Gönderilemedi',
          'Kayıtlı kontak bulunamadı'
        );
        return;
      }

      // Contact numaralarını kontrol et
      const validNumbers = contactNumbers.filter(num => num && typeof num === 'string');
      if (validNumbers.length === 0) {
        throw new Error('Geçerli telefon numarası bulunamadı');
      }

      // Alert tipine göre mesaj oluştur
      const message = `${alertType === 'glass_breaking' ? 'Cam Kırılma' : 
                       alertType === 'fall' ? 'Düşme' :
                       alertType === 'scream' ? 'Çığlık' : 
                       'Bilinmeyen'} Sesi Algılandı! - Otomatik acil durum bildirimi`;

      // SMS gönder
      await sendBulkSms(message, validNumbers);
      
      await sendNotification(
        { enabled: true, sound: true, vibration: true },
        '✅ SMS Gönderildi',
        'Kontaklar otomatik olarak bilgilendirildi'
      );

      requestAnimationFrame(() => {
        setShowAlert(false);
        setAlertType(null);
        setPaused(false);
      });

    } catch (err) {
      console.error('❌ SMS gönderme hatası:', err);
      await sendNotification(
        { enabled: true, sound: true, vibration: true },
        '❌ SMS Gönderilemedi',
        err.message || 'SMS gönderimi sırasında bir hata oluştu'
      );
    }
  }, [alertType, contactNumbers, loadingContacts]);

  const handlePress = async () => {
    try {
      if (!isListening) {
        startAnimation();
        scale.value = withSpring(0.95);

        const token = await getToken();
        connectWS({token});

        onAIResult(async ({result}) => {
          if (showAlert) return;
          
          if (!result || result === 'silence') return;

          // Sessizlik dışındaki tehlikeli durumlar için alert göster
          setPaused(true);
          setAlertType(result);
          setShowAlert(true);
        });

        startSendingAudio(token, 2000);
      } else {
        stopAnimation();
        scale.value = withSpring(1);
        disconnectWS();
        setShowAlert(false);
        setAlertType(null);
      }

      setIsListening(v => !v);
    } catch (err) {
      console.error('❌ Hata:', err);
      Alert.alert('Hata', err.message);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.headerContainer}>
        <Logo size="lg" />
      </View>

      <View style={styles.circleContainer}>
        <Animated.View
          style={[styles.ring, ring3Style, {borderColor: accentColor}]}
          needsOffscreenAlphaCompositing
        />
        <Animated.View
          style={[styles.ring, ring2Style, {borderColor: accentColor}]}
          needsOffscreenAlphaCompositing
        />
        <Animated.View
          style={[styles.ring, ring1Style, {borderColor: accentColor}]}
          needsOffscreenAlphaCompositing
        />

        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <Animated.View
            style={[styles.button, buttonStyle, {backgroundColor: buttonBgColor}]}
            needsOffscreenAlphaCompositing
          >
            <MaterialIcons
              name={isListening ? 'mic-off' : 'mic'}
              size={56}
              color="white"
            />
            <Text style={styles.buttonStatus}>
              {isListening ? 'Dinleniyor...' : 'Başlat'}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {!isListening && (
        <View
          style={[
            styles.descriptionContainer,
            {
              backgroundColor: descBgColor,
              borderColor: descBorderColor,
            },
          ]}>
          <View style={[styles.iconBackground, {backgroundColor: iconBgColor}]}>
            <MaterialIcons name="security" size={24} color={accentColor} />
          </View>
          <Text style={[styles.descriptionText, {color: secondaryTextColor}]}>
            Bu özellik, çevredeki sesleri algılar ve acil durumları hızla tespit
            eder. Mikrofon butonuna basarak sesli izlemeyi aktive edebilir,
            tehlikelere hızlıca tepki verebilirsiniz.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.alertButton, {backgroundColor: buttonBgColor}]}
        onPress={() => setShowManualAlert(true)}>
        <MaterialIcons
          name="warning"
          size={24}
          color="white"
          style={styles.alertButtonIcon}
        />
        <Text style={styles.alertButtonText}>Bilinçli Uyarı Gönder</Text>
      </TouchableOpacity>

      <AlertPopup
        visible={showAlert}
        type={alertType}
        onCancel={handleAlertCancel}
        onConfirm={handleAlertConfirm}
        onTimeout={handleAlertTimeout}
      />
      {/* Manuel Popup */}
      <ManualAlertPopup
        visible={showManualAlert}
        onCancel={() => setShowManualAlert(false)}
        onConfirm={onManualConfirm}
      />
    </View>
  );
};

export default HomeScreen;
