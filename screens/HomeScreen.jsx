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
  const {data: contacts, isLoading: loadingContacts} = useGetContacts();
  const contactNumbers = Array.isArray(contacts)
    ? contacts.map(c => c.phoneNumber) // API’nize göre değiştirin
    : [];
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

  const animateRing = (ringScale, delay = 0, maxScale = 1.8) => {
    'worklet';
    ringScale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(maxScale, {duration: 1000}),
          withTiming(1, {duration: 1000}),
        ),
        -1,
      ),
    );
  };

  const startAnimation = () => {
    'worklet';
    animateRing(ring1Scale, 0, 1.8);
    animateRing(ring2Scale, 200, 1.85);
    animateRing(ring3Scale, 400, 1.9);
  };

  const stopAnimation = () => {
    'worklet';
    ring1Scale.value = withTiming(1);
    ring2Scale.value = withTiming(1);
    ring3Scale.value = withTiming(1);
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

  const handleAlertTimeout = useCallback(async () => {
    requestAnimationFrame(async () => {
      setShowAlert(false);
      setAlertType(null);
      setPaused(false);

      // Alert kapandıktan sonra ses dinlemeyi tekrar başlat
      console.log('🔄 Ses dinleme yeniden başlatılıyor...');
      const token = await getToken();
      startSendingAudio(token, 2000);
    });
  }, []);

  const handleAlertConfirm = useCallback(async () => {
    console.log('Kontaklar bilgilendiriliyor...');
    setShowAlert(false);
    setAlertType(null);
    setPaused(false);

    // Alert kapandıktan sonra ses dinlemeyi tekrar başlat
    console.log('🔄 Ses dinleme yeniden başlatılıyor...');
    const token = await getToken();
    startSendingAudio(token, 2000);
  }, []);

  const handlePress = async () => {
    console.log('▶️ [HomeScreen] WS_URL =', Constants.expoConfig.extra.WS_URL);
    console.log('▶️ [HomeScreen] Platform.OS =', Platform.OS);
    console.log('▶️ handlePress çağrıldı, isListening =', isListening);
    try {
      if (!isListening) {
        console.log('  • Dinlemeye başlıyoruz…');
        startAnimation();
        scale.value = withSpring(0.95);

        console.log('  • JWT almaya çalışılıyor…');
        const token = await getToken();
        console.log('  • Token:', token);

        console.log('  • WS’e bağlanılıyor…');
        connectWS({token});
        console.log('  • onAIResult handler ayarlandı');

        onAIResult(async ({result}) => {
          console.log('🧠 AI sonucu:', result);

          if (showAlert) {
            console.log('⚠️ Zaten aktif bir alert var');
            return;
          }

          if (!result || result === 'silence') {
            console.log('✅ Güvenli durum algılandı');
            return;
          }

          // Alert göster ve ses dinlemeyi durdur
          console.log('🚨 Alert gösteriliyor:', result);
          setPaused(true); // Önce ses dinlemeyi durdur
          setAlertType(result);
          setShowAlert(true);
        });

        console.log('  • startSendingAudio başlatılıyor…');
        startSendingAudio(token, 2000);
        console.log('  • Audio gönderme başlatıldı');
      } else {
        console.log('  • Dinleme durduruluyor…');
        stopAnimation();
        scale.value = withSpring(1);
        disconnectWS();
        setShowAlert(false);
        setAlertType(null);
      }

      setIsListening(v => !v);
      console.log('▶️ isListening artık =', !isListening);
    } catch (err) {
      console.error('▶️ handlePress Hatası:', err);
      Alert.alert('Hata', err.message);
    }
  };

  const ring1Style = useAnimatedStyle(() => ({
    transform: [{scale: ring1Scale.value}],
    opacity: withTiming(isListening ? 0.2 : 0),
  }));

  const ring2Style = useAnimatedStyle(() => ({
    transform: [{scale: ring2Scale.value}],
    opacity: withTiming(isListening ? 0.15 : 0),
  }));

  const ring3Style = useAnimatedStyle(() => ({
    transform: [{scale: ring3Scale.value}],
    opacity: withTiming(isListening ? 0.1 : 0),
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));
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

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.headerContainer}>
        <Logo size="lg" />
      </View>

      <View style={styles.circleContainer}>
        <Animated.View
          style={[styles.ring, ring3Style, {borderColor: accentColor}]}
        />
        <Animated.View
          style={[styles.ring, ring2Style, {borderColor: accentColor}]}
        />
        <Animated.View
          style={[styles.ring, ring1Style, {borderColor: accentColor}]}
        />

        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <Animated.View
            style={[
              styles.button,
              buttonStyle,
              {backgroundColor: buttonBgColor},
            ]}>
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
        onPress={() => {
          console.log('Buton basıldı, showManualAlert önce:', showManualAlert);
          setShowManualAlert(true);
          console.log('Buton basıldı, showManualAlert sonra:', showManualAlert);
        }}>
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
