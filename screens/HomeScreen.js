import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
        justifyContent: 'space-between', // Butonları yukarı ve aşağıya yerleştirmek için
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
        flex: 1,
        justifyContent: 'center', // Butonu ortalamak için
        alignItems: 'center',
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
    alertButton: {
        backgroundColor: '#FF8C00',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
});

export default HomeScreen;
