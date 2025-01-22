// screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CheckBox from '@react-native-community/checkbox';// Import the icon library

const SignInScreen = ({ navigation }) => {
    const [isAgreed, setIsAgreed] = useState(false); // Şifreyi hatırla durumu

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VoiceWatcher</Text>
            <TextInput
                style={styles.input}
                placeholder="TC Kimlik Numarası"
                placeholderTextColor="#FF8C00"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Parola"
                placeholderTextColor="#FF8C00"
                secureTextEntry
            />
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)} style={styles.checkbox}>
                    {isAgreed ? (
                        <Icon name="check-square" size={20} color="#FF4500" />
                    ) : (
                        <Icon name="square-o" size={20} color="#FF4500" />
                    )}
                </TouchableOpacity>
                <Text style={styles.linkText}>Şifreyi Hatırla</Text>
            </View>
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                    Hesabınız yok mu? 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.registerLink}> Kayıt Ol</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
        padding: 20,
    },
    title: {
        fontSize: 36,
        marginBottom: 20,
        color: '#FF4500',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#FF4500',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        backgroundColor: '#FF4500',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    linkText: {
        color: '#FF8C00',
        fontSize: 14,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    registerText: {
        fontSize: 14,
        color: '#FF8C00',
    },
    registerLink: {
        color: '#FF4500',
        fontWeight: 'bold',
    },
    checkbox: {
        marginRight: 10,
    },
});

export default SignInScreen;