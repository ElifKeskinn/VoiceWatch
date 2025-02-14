// screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CheckBox from '@react-native-community/checkbox';// Import the icon library
import { useColorModeValue } from 'native-base';
import Logo from '../components/common/Logo';
import { styles } from '../styles/SignIn.styles';

const SignInScreen = ({ navigation }) => {
    const [tcNumber, setTcNumber] = useState('');
    const [password, setPassword] = useState('');
    const [tcNumberError, setTcNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isAgreed, setIsAgreed] = useState(false); // Şifreyi hatırla durumu
    
    // Dark mode renkleri
    const bgColor = useColorModeValue('#FFFAF0', '#121212');
    const inputBgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', '#1E1E1E');
    const inputBorderColor = useColorModeValue('#FF4500', '#FF6347');
    const textColor = useColorModeValue('#000000', '#E8E8E8');
    const placeholderColor = useColorModeValue('#FF8C00', '#FF6347');
    const secondaryTextColor = useColorModeValue('#FF8C00', '#B0B0B0');
    const buttonBgColor = useColorModeValue('#FF4500', '#FF6347');
    const errorColor = useColorModeValue('#FF0000', '#FF6666');

    const handleSignIn = () => {
        let isValid = true;
        setTcNumberError('');
        setPasswordError('');

        // Validate TC Kimlik Numarası
        if (!tcNumber) {
            setTcNumberError('TC Kimlik Numarası boş olamaz.');
            isValid = false;
        } else if (tcNumber.length !== 11 || !/^\d+$/.test(tcNumber)) {
            setTcNumberError('Hatalı TC.');
            isValid = false;
        }

        // Validate Password
        if (!password) {
            setPasswordError('Parola boş olamaz.');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Hatalı şifre');
            isValid = false;
        }

        // Navigate to Main if valid
        if (isValid) {
            navigation.navigate('Main');
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: bgColor}]}>
            <View style={styles.logoContainer}>
                <Logo size="lg" />
            </View>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor,
                        color: textColor,
                    },
                ]}
                placeholder="TC Kimlik Numarası"
                placeholderTextColor={placeholderColor}
                keyboardType="numeric"
                maxLength={11}
                value={tcNumber}
                onChangeText={setTcNumber}
            />
            {tcNumberError ? (
                <Text style={[styles.errorText, {color: errorColor}]}>
                    {tcNumberError}
                </Text>
            ) : null}

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor,
                        color: textColor,
                    },
                ]}
                placeholder="Parola"
                placeholderTextColor={placeholderColor}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {passwordError ? (
                <Text style={[styles.errorText, {color: errorColor}]}>
                    {passwordError}
                </Text>
            ) : null}
            
            <TouchableOpacity
                style={[styles.button, {backgroundColor: buttonBgColor}]}
                onPress={handleSignIn}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <TouchableOpacity
                    onPress={() => setIsAgreed(!isAgreed)}
                    style={styles.checkbox}>
                    {isAgreed ? (
                        <Icon name="check-square" size={20} color={inputBorderColor} />
                    ) : (
                        <Icon name="square-o" size={20} color={inputBorderColor} />
                    )}
                </TouchableOpacity>
                <Text style={[styles.linkText, {color: secondaryTextColor}]}>
                    Şifreyi Hatırla
                </Text>
            </View>
            <View style={styles.registerContainer}>
                <Text style={[styles.registerText, {color: secondaryTextColor}]}>
                    Hesabınız yok mu?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.registerLink, {color: buttonBgColor}]}>
                        {' '}
                        Kayıt Ol
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignInScreen;