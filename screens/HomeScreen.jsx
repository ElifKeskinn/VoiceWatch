import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';

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
                <Button 
                    onPress={toggleListening} 
                    style={styles.circleButton}
                >
                    {isListening ? "Durdur" : "Başlat"}
                </Button>
            </View>
            <Button onPress={sendAlert} variant="outline" style={styles.alertButton}>
                Bilinçli Uyarı Gönder
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
        paddingVertical: 20, 
    },
    title: {
        fontSize: 36,
        marginBottom: 20, 
        color: '#FF4500',
        fontWeight: 'bold',
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 20, 
    },
    circleButton: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    alertButton: {
        paddingVertical: 20, 
        borderRadius: 10,
        alignItems: 'center',
        width: '90%', 
        backgroundColor: '#ffa500',
    },
});

export default HomeScreen;
