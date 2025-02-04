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
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import Button from '../../components/common/Button';

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
      newErrors.newPassword = 'Şifre en az bir özel karakter içermeli (!@#$%^&*)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (formData.oldPassword === '123ABC') {
        toast.show({
          title: 'Başarılı',
          description: 'Şifreniz başarıyla değiştirildi',
          status: 'success',
        });
        navigation.goBack();
      } else {
        setErrors({
          oldPassword: 'Mevcut şifre yanlış',
        });
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Box p={4}>
        <VStack space={4}>
          <Box bg="rgba(255,69,0,0.1)" p={4} rounded="xl" mb={4}>
            <Text color="#FF4500">
              Güvenli bir şifre için:
              {'\n'}- En az 8 karakter
              {'\n'}- En az 1 büyük harf
              {'\n'}- En az 1 rakam
              {'\n'}- En az 1 özel karakter (!@#$%^&*)
            </Text>
          </Box>

          <FormControl isInvalid={!!errors.oldPassword}>
            <FormControl.Label>Mevcut Şifre</FormControl.Label>
            <Input
              type={showPasswords.old ? 'text' : 'password'}
              value={formData.oldPassword}
              onChangeText={value =>
                setFormData({...formData, oldPassword: value})
              }
              autoComplete="off"
              secureTextEntry
              InputRightElement={
                <Icon
                  as={Ionicons}
                  name={showPasswords.old ? 'eye-off' : 'eye'}
                  size={5}
                  mr="2"
                  color="#FF4500"
                  onPress={() =>
                    setShowPasswords({
                      ...showPasswords,
                      old: !showPasswords.old,
                    })
                  }
                />
              }
              borderColor="#FF4500"
              _focus={{
                borderColor: '#FF8C00',
                bg: 'transparent',
              }}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.oldPassword}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.newPassword}>
            <FormControl.Label>Yeni Şifre</FormControl.Label>
            <Input
              type={showPasswords.new ? 'text' : 'password'}
              value={formData.newPassword}
              onChangeText={value =>
                setFormData({...formData, newPassword: value})
              }
              autoComplete="off"
              secureTextEntry
              InputRightElement={
                <Icon
                  as={Ionicons}
                  name={showPasswords.new ? 'eye-off' : 'eye'}
                  size={5}
                  mr="2"
                  color="#FF4500"
                  onPress={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                />
              }
              borderColor="#FF4500"
              _focus={{
                borderColor: '#FF8C00',
                bg: 'transparent',
              }}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.newPassword}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            onPress={handleSubmit}
            bg="#FF4500"
            _pressed={{bg: '#FF8C00'}}
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
    backgroundColor: '#FFFAF0',
  },
});

export default PasswordChangeScreen;
