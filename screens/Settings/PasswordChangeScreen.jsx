import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Box,
  VStack,
  Text,
  Input,
  Icon,
  useToast,
  FormControl,
  WarningOutlineIcon,
  useColorModeValue,
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Button from '../../components/common/Button';
import {useChangePassword} from '../../services/requests/authRequest';

const PasswordChangeScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
  });
  const toast = useToast();
  const changePasswordMutation = useChangePassword();

  // Karanlık mod renkleri
  const bgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const boxBgColor = useColorModeValue(
    'rgba(255,69,0,0.1)',
    'rgba(255,99,71,0.2)',
  );
  const textColor = useColorModeValue('#FF4500', '#FF6347');
  const labelColor = useColorModeValue('#000000', '#FFFFFF');
  const inputBgColor = useColorModeValue('transparent', '#2D2D2D');
  const inputBorderColor = useColorModeValue('#FF4500', '#FF6347');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Mevcut şifre gerekli';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Yeni şifre gerekli';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Şifre en az 8 karakter olmalı';
    } else if (formData.newPassword === formData.oldPassword) {
      newErrors.newPassword = 'Yeni şifre eski şifre ile aynı olamaz';
    } else if (!/(?=.*[0-9])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Şifre en az bir rakam içermeli';
    } else if (!/(?=.*[A-Z])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Şifre en az bir büyük harf içermeli';
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.newPassword)) {
      newErrors.newPassword =
        'Şifre en az bir özel karakter içermeli (!@#$%^&*)';
    }

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
        navigation.goBack();
      } catch (error) {
        setErrors({
          oldPassword: error.message,
        });
      }
    }
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: bgColor}]}>
      <Box p={4}>
        <VStack space={4}>
          <Box bg={boxBgColor} p={4} rounded="xl" mb={4}>
            <Text color={textColor}>
              Güvenli bir şifre için:
              {'\n'}- En az 8 karakter
              {'\n'}- En az 1 büyük harf
              {'\n'}- En az 1 rakam
              {'\n'}- En az 1 özel karakter (!@#$%^&*)
            </Text>
          </Box>

          <FormControl isInvalid={!!errors.oldPassword}>
            <FormControl.Label _text={{color: labelColor}}>
              Mevcut Şifre
            </FormControl.Label>
            <Input
              type={showPasswords.old ? 'text' : 'password'}
              value={formData.oldPassword}
              onChangeText={value =>
                setFormData({...formData, oldPassword: value})
              }
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={labelColor}
              placeholderTextColor={placeholderColor}
              _focus={{
                borderColor: textColor,
                bg: inputBgColor,
              }}
              InputRightElement={
                <Icon
                  as={Ionicons}
                  name={showPasswords.old ? 'eye-off' : 'eye'}
                  size={5}
                  mr="2"
                  color={textColor}
                  onPress={() =>
                    setShowPasswords({
                      ...showPasswords,
                      old: !showPasswords.old,
                    })
                  }
                />
              }
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.oldPassword}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.newPassword}>
            <FormControl.Label _text={{color: labelColor}}>
              Yeni Şifre
            </FormControl.Label>
            <Input
              type={showPasswords.new ? 'text' : 'password'}
              value={formData.newPassword}
              onChangeText={value =>
                setFormData({...formData, newPassword: value})
              }
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={labelColor}
              placeholderTextColor={placeholderColor}
              _focus={{
                borderColor: textColor,
                bg: inputBgColor,
              }}
              InputRightElement={
                <Icon
                  as={Ionicons}
                  name={showPasswords.new ? 'eye-off' : 'eye'}
                  size={5}
                  mr="2"
                  color={textColor}
                  onPress={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                />
              }
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.newPassword}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            onPress={handleSubmit}
            bg={textColor}
            _pressed={{bg: useColorModeValue('#FF8C00', '#FF7F50')}}
            mt={4}>
            Şifreyi Değiştir
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PasswordChangeScreen;
