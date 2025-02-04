import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import AlertPopup from '../components/AlertPopup';
import { useColorModeValue } from 'native-base';
import Logo from '../components/common/Logo';

const { width } = Dimensions.get('window');
const CIRCLE_LENGTH = width * 0.7;
const BUTTON_SIZE = width * 0.45;

const HomeScreen = () => {
    const [isListening, setIsListening] = useState(false);
    const [alertType, setAlertType] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const scale = useSharedValue(1);
    const ring1Scale = useSharedValue(1);
    const ring2Scale = useSharedValue(1);
    const ring3Scale = useSharedValue(1);
    
    // Alert timer'ı için useRef kullanıyoruz
    const alertTimer = React.useRef(null);

    // Dark mod renkleri
    const bgColor = useColorModeValue('#FFFAF0', '#121212');
    const textColor = useColorModeValue('#000000', '#E8E8E8');
    const accentColor = useColorModeValue('#FF4500', '#FF6347');
    const buttonBgColor = useColorModeValue('#FF4500', '#FF6347');
    const descBgColor = useColorModeValue('#FFF8F0', '#1E1E1E');
    const descBorderColor = useColorModeValue('rgba(255,69,0,0.15)', 'rgba(255,255,255,0.1)');
    const iconBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.15)');
    const secondaryTextColor = useColorModeValue('#666666', '#B0B0B0');

    const animateRing = (ringScale, delay = 0, maxScale = 1.8) => {
        'worklet';
        ringScale.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(maxScale, { duration: 1000 }),
                    withTiming(1, { duration: 1000 })
                ),
                -1
            )
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

    const handlePress = () => {
        setIsListening(prev => {
            if (!prev) {
                startAnimation();
                scale.value = withSpring(0.95);
            } else {
                stopAnimation();
                scale.value = withSpring(1);
            }
            return !prev;
        });
    };

    const ring1Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring1Scale.value }],
        opacity: withTiming(isListening ? 0.2 : 0),
    }));

    const ring2Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring2Scale.value }],
        opacity: withTiming(isListening ? 0.15 : 0),
    }));

    const ring3Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring3Scale.value }],
        opacity: withTiming(isListening ? 0.1 : 0),
    }));

    const buttonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        let newAlertTimer;
        
        if (isListening && !showAlert) {
            newAlertTimer = setTimeout(() => {
                const alertTypes = ['silence', 'glass', 'fall', 'scream'];
                const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
                setAlertType(randomAlert);
                setShowAlert(true);
            }, 10000);
        }

        return () => {
            if (newAlertTimer) {
                clearTimeout(newAlertTimer);
            }
        };
    }, [isListening, showAlert]);

    const handleAlertCancel = useCallback(() => {
        setShowAlert(false);
        setAlertType(null);
    }, []);

    const handleAlertConfirm = useCallback(() => {
        console.log('Kontaklar bilgilendiriliyor...');
        setShowAlert(false);
        setAlertType(null);
    }, []);

    const handleAlertTimeout = useCallback(() => {
        requestAnimationFrame(() => {
            setShowAlert(false);
            setAlertType(null);
        });
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: bgColor}]}>
            <View style={styles.headerContainer}>
                <Logo size="lg" />
            </View>
            
            <View style={styles.circleContainer}>
                <Animated.View
                    style={[
                        styles.ring,
                        ring3Style,
                        {borderColor: accentColor},
                    ]}
                />
                <Animated.View
                    style={[
                        styles.ring,
                        ring2Style,
                        {borderColor: accentColor},
                    ]}
                />
                <Animated.View
                    style={[
                        styles.ring,
                        ring1Style,
                        {borderColor: accentColor},
                    ]}
                />
                
                <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                    <Animated.View
                        style={[
                            styles.button,
                            buttonStyle,
                            {backgroundColor: buttonBgColor},
                        ]}>
                        <MaterialIcons 
                            name={isListening ? "mic-off" : "mic"} 
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
                <View style={[styles.descriptionContainer, {
                    backgroundColor: descBgColor,
                    borderColor: descBorderColor,
                }]}>
                    <View style={[styles.iconBackground, {backgroundColor: iconBgColor}]}>
                        <MaterialIcons 
                            name="security" 
                            size={24} 
                            color={accentColor} 
                        />
                    </View>
                    <Text style={[styles.descriptionText, {color: secondaryTextColor}]}>
                        Bu özellik, çevredeki sesleri algılar ve acil durumları hızla tespit eder. Mikrofon butonuna basarak sesli izlemeyi aktive edebilir, tehlikelere hızlıca tepki verebilirsiniz.
                    </Text>
                </View>
            )}

            <TouchableOpacity 
                style={[styles.alertButton, {backgroundColor: buttonBgColor}]}
                onPress={() => console.log("Bilinçli uyarı gönderildi!")}
            >
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
    },
    circleContainer: {
        width: CIRCLE_LENGTH,
        height: CIRCLE_LENGTH,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '35%',
    },
    ring: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        borderWidth: 2,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    buttonStatus: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 8,
    },
    iconBackground: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        marginHorizontal: 20,
        marginTop: CIRCLE_LENGTH + 40,
        marginBottom: -10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        maxWidth: width * 0.9,
        alignSelf: 'center',
    },
    descriptionText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
    alertButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 10,
        width: '85%',
        marginBottom: 0,
    },
    alertButtonIcon: {
        marginRight: 8,
    },
    alertButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default HomeScreen;
