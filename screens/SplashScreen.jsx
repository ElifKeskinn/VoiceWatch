import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity of 0
    const scaleAnim = useRef(new Animated.Value(0)).current; // Initial scale of 0

    useEffect(() => {
        // Fade in and scale up animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000, // Duration of fade-in
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 2000, // Duration of scale-up
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('SignIn'); // Navigate to SignIn screen after the splash
        }, 4000); // Display for 4 seconds

        return () => clearTimeout(timer); // Cleanup the timer
    }, [navigation, fadeAnim, scaleAnim]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Animated.Image
                source={require('../assets/splash.png')} // Adjust the path as necessary
                style={[styles.logo, { transform: [{ scale: scaleAnim }] }]} // Apply scale animation
                resizeMode="contain"
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFAF0', // Background color
    },
    logo: {
        width: 470, // Increased size
        height: 470, // Increased size
        marginBottom: 20,
    },
});

export default SplashScreen;
