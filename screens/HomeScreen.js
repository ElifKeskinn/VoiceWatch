import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const HomeScreen = () => {
    const [isListening, setIsListening] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    let animationLoop = null; // Animasyon döngüsünü saklamak için bir değişken

    const toggleListening = () => {
        setIsListening(!isListening);
        if (!isListening) {
            startAnimation();
        } else {
            stopAnimation();
        }
    };

    const startAnimation = () => {
        animationLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );
        animationLoop.start();
    };

    const stopAnimation = () => {
        if (animationLoop) {
            animationLoop.stop(); // Animasyonu durdur
            animationLoop = null; // Referansı temizle
        }
        animation.setValue(0); // Animasyonu sıfırla
    };

    const sendAlert = () => {
        console.log("Bilinçli uyarı gönderildi!");
    };

    const animatedStyle = (delay) => ({
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2], // Dairenin büyüme oranı
                }),
            },
        ],
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 0], // Dairenin solma efekti
        }),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VoiceWatcher</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.circleButton, isListening && styles.activeButton]}
                    onPress={toggleListening}
                >
                    <Text style={styles.buttonText}>
                        {isListening ? "Durdur" : "Başlat"}
                    </Text>
                </TouchableOpacity>
                {isListening && (
                    <>
                        <Animated.View style={[styles.animatedCircle, animatedStyle(0)]} />
                        <Animated.View style={[styles.animatedCircle, animatedStyle(200)]} />
                        <Animated.View style={[styles.animatedCircle, animatedStyle(400)]} />
                    </>
                )}
            </View>
            <TouchableOpacity style={styles.alertButton} onPress={sendAlert}>
                <Text style={styles.buttonText}>Bilinçli Uyarı Gönder</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Başlık yukarı alındı
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
        padding: 20,
    },
    title: {
        fontSize: 36,
        marginTop: 40, // Başlık için üst boşluk
        marginBottom: 40, // Başlık altındaki boşluk
        color: '#FF4500',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    circleButton: {
        backgroundColor: '#FF4500',
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    activeButton: {
        backgroundColor: '#FF8C00',
    },
    animatedCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 69, 0, 0.3)',
    },
    alertButton: {
        backgroundColor: '#FF8C00',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
});

export default HomeScreen;
