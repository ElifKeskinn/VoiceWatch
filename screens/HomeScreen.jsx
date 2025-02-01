import React, { useState, useEffect } from 'react';
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
import AlertPopup from '../components/AlertPopup';

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
        let alertTimer;
        if (isListening) {
            alertTimer = setTimeout(() => {
                // Rastgele bir alert tipi seçiyoruz (gerçek uygulamada ses analizi sonucuna göre belirlenecek)
                const alertTypes = ['silence', 'glass', 'fall', 'scream'];
                const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
                setAlertType(randomAlert);
                setShowAlert(true);
            }, 10000); // 10 saniye sonra
        }
        return () => clearTimeout(alertTimer);
    }, [isListening]);

    const handleAlertCancel = () => {
        setShowAlert(false);
        setAlertType(null);
    };

    const handleAlertConfirm = () => {
        // Burada kontakları bilgilendirme işlemi yapılacak
        console.log('Kontaklar bilgilendiriliyor...');
        setShowAlert(false);
        setAlertType(null);
    };

    const handleAlertTimeout = () => {
        setShowAlert(false);
        setAlertType(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VoiceWatcher</Text>
            
            <View style={styles.circleContainer}>
                <Animated.View style={[styles.ring, ring3Style]} />
                <Animated.View style={[styles.ring, ring2Style]} />
                <Animated.View style={[styles.ring, ring1Style]} />
                
                <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                    <Animated.View style={[styles.button, buttonStyle]}>
                        <Text style={styles.buttonText}>
                            {isListening ? 'Durdur' : 'Başlat'}
                        </Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>

            {!isListening && (
                <Text style={styles.descriptionText}>
                    Bu özellik, çevredeki sesleri algılar ve acil durumları hızla tespit eder. Başlat butonuna basarak sesli izlemeyi aktive edebilir, tehlikelere hızlıca tepki verebilirsiniz.
                </Text>
            )}

            <TouchableOpacity 
                style={styles.alertButton}
                onPress={() => console.log("Bilinçli uyarı gönderildi!")}
            >
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
        backgroundColor: '#FFFAF0',
        paddingVertical: 50,
    },
    title: {
        fontSize: 36,
        color: '#FF4500',
        fontWeight: 'bold',
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
        borderColor: '#FF4500',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    descriptionText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 14,
        paddingHorizontal: 30,
        position: 'absolute',
        top: '60%',
        lineHeight: 20,
        marginTop:100,
    },
    alertButton: {
        backgroundColor: '#ffa500',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: -10,
        width: '80%',
        position: 'absolute',
        bottom: 40,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
    },
    alertButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
