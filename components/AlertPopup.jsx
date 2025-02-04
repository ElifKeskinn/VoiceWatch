import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, VStack, HStack, Icon, useColorModeValue } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AlertPopup = ({ visible, type, onCancel, onConfirm, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = React.useRef(null);
  const flashAnimation = React.useRef(new Animated.Value(0)).current;

  const modalBgColor = useColorModeValue('white', '#1E1E1E');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue('#F0F0F0', 'rgba(255,255,255,0.1)');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const secondaryTextColor = useColorModeValue('#888', '#B0B0B0');
  const buttonBgColor = useColorModeValue('white', '#2D2D2D');

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

  useEffect(() => {
    if (visible) {
      setTimeLeft(30);
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            requestAnimationFrame(() => {
              onTimeout?.();
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimeLeft(30);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible, onTimeout]);

  const getAlertInfo = () => {
    switch (type) {
      case 'silence':
        return {
          icon: 'volume-off',
          title: 'Uzun Süreli Sessizlik Algılandı!',
          color: '#FF4500',
        };
      case 'glass':
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
          title: 'Uyarı!',
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
                onPress={onConfirm}
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  alertBox: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  headerIcon: {
    marginBottom: 4,
    opacity: 0.9,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 16,
    width: '100%',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '600',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 69, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  timerLabel: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
    fontWeight: '400',
  },
  buttonContainer: {
    marginTop: 16,
    gap: 10,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmButton: {
    backgroundColor: '#FF4500',
  },
  buttonIcon: {
    marginRight: 6,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FF4500',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  confirmButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default AlertPopup; 