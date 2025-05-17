import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorModeValue, useToast, Box, FormControl } from 'native-base';
import Button from '../../components/common/Button';
import { useChangePassword } from '../../services/requests/authRequest';

const PasswordChangeScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({ old: false, new: false });
  const toast = useToast();
  const changePasswordMutation = useChangePassword();

  const bgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const boxBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');
  const textColor = useColorModeValue('#FF4500', '#FF6347');
  const labelColor = useColorModeValue('#000', '#FFF');
  const warningTextColor = useColorModeValue('#000000', '#FFFFFF');
  const inputBgColor = useColorModeValue('#FFF', '#2D2D2D');
  const inputBorderColor = useColorModeValue('#FF4500', '#FF6347');
  const placeholderColor = '#999';

  const validateForm = () => {
    const newErrors = {};
    const specialCharRegex = /[!@#$%^&*.,]/;

    if (!formData.oldPassword) newErrors.oldPassword = 'Mevcut şifre gerekli';
    if (!formData.newPassword) newErrors.newPassword = 'Yeni şifre gerekli';
    else if (formData.newPassword.length < 8) newErrors.newPassword = 'Şifre en az 8 karakter olmalı';
    else if (formData.newPassword === formData.oldPassword) newErrors.newPassword = 'Yeni şifre eskiyle aynı olamaz';
    else if (!/(?=.*[0-9])/.test(formData.newPassword)) newErrors.newPassword = 'En az bir rakam içermeli';
    else if (!/(?=.*[A-Z])/.test(formData.newPassword)) newErrors.newPassword = 'En az bir büyük harf içermeli';
    else if (!specialCharRegex.test(formData.newPassword)) newErrors.newPassword = 'En az bir özel karakter (!@#$%^&*.,) içermeli';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await changePasswordMutation.mutateAsync({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
        toast.show({
          title: 'Şifre başarıyla değiştirildi',
          placement: 'top',
        });
        navigation.goBack();
      } catch (error) {
        setErrors({ oldPassword: error.message || 'Mevcut şifre yanlış' });
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={[styles.container, { backgroundColor: bgColor }]
          }
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Box bg={boxBgColor} p={4} borderRadius={12} mb={4}>
            <Text style={{ color: textColor }}>
              Güvenli bir şifre için:
              {'\n'}- En az 8 karakter
              {'\n'}- En az 1 büyük harf
              {'\n'}- En az 1 rakam
              {'\n'}- En az 1 özel karakter (!@#$%^&*.,)
            </Text>
          </Box>

          <FormControl.Label _text={{ color: warningTextColor }}>
                  Mevcut Şifre
          </FormControl.Label>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.oldPassword}
              onChangeText={(text) => setFormData({ ...formData, oldPassword: text })}
              secureTextEntry={!showPasswords.old}
              placeholder="Mevcut şifrenizi girin"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { backgroundColor: inputBgColor, borderColor: inputBorderColor, color: labelColor }]}
            />
            <Ionicons
              name={showPasswords.old ? 'eye-off' : 'eye'}
              size={20}
              color={textColor}
              style={styles.eyeIcon}
              onPress={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
            />
          </View>
          {errors.oldPassword && <Text style={styles.errorText}>{errors.oldPassword}</Text>}

          <FormControl.Label _text={{ color: warningTextColor }}>
                  Yeni Şifre
          </FormControl.Label>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.newPassword}
              onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
              secureTextEntry={!showPasswords.new}
              placeholder="Yeni şifrenizi girin"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { backgroundColor: inputBgColor, borderColor: inputBorderColor, color: labelColor }]}
            />
            <Ionicons
              name={showPasswords.new ? 'eye-off' : 'eye'}
              size={20}
              color={textColor}
              style={styles.eyeIcon}
              onPress={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
            />
          </View>
          {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

          <Button onPress={handleSubmit} mt={4}>Şifreyi Değiştir</Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default PasswordChangeScreen;
