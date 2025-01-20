import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
    const [isListening, setIsListening] = useState(false);

    const toggleListening = () => {
        setIsListening(!isListening);
    };

    const sendAlert = () => {
        console.log("Bilinçli uyarı gönderildi!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VoiceWatcher</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.circleButton} onPress={toggleListening}>
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
        backgroundColor: '#FFFAF0', // Mevcut uygulama rengi
        padding: 20,
    },
    title: {
        fontSize: 36,
        marginBottom: 40,
        color: '#FF4500', // Mevcut uygulama rengi
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    circleButton: {
        backgroundColor: '#FF4500', // Mevcut uygulama rengi
        width: 150,
        height: 150,
        borderRadius: 75, // Yuvarlak buton
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Gölge efekti
    },
    alertButton: {
        backgroundColor: '#FF8C00', // Mevcut uygulama rengi
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;