import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const HomeScreen = () => {
    const [isListening, setIsListening] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [pulseAnimation, setPulseAnimation] = useState(null);

    const toggleListening = () => {
        setIsListening(!isListening);
        if (!isListening) {
            startAnimation();
        } else {
            stopAnimation();
        }
    };

    const startAnimation = () => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        setPulseAnimation(pulse);
        pulse.start();
    };

    const stopAnimation = () => {
        if (pulseAnimation) {
            pulseAnimation.stop();
            setPulseAnimation(null);
        }
        animation.setValue(0);
    };

    const sendAlert = () => {
        console.log("Bilinçli uyarı gönderildi!");
    };

    const animatedStyle = {
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2], // Büyüme oranı
                }),
            },
        ],
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 0], // Solma efekti
        }),
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VoiceWatcher</Text>
            <View style={styles.buttonContainer}>
                <Animated.View style={[styles.animatedCircle, animatedStyle]} />
                <Animated.View style={[styles.animatedCircle, animatedStyle, { width: 250, height: 250 }]} />
                <TouchableOpacity
                    style={[styles.circleButton, isListening && styles.activeButton]}
                    onPress={toggleListening}
                >
                    <Text style={styles.buttonText}>
                        {isListening ? "Durdur" : "Başlat"}
                    </Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    title: {
        fontSize: 32,
        marginBottom: 40,
        color: '#333',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    circleButton: {
        backgroundColor: '#007AFF',
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    activeButton: {
        backgroundColor: '#FF3B30',
    },
    animatedCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 122, 255, 0.2)',
    },
    alertButton: {
        backgroundColor: '#FF9500',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
});

export default HomeScreen;
