// Düzenlenmiş dosya: DeleteAccountScreen.jsx
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  VStack,
  Icon,
  useToast,
  FormControl,
  WarningOutlineIcon,
  AlertDialog,
  Button as NativeBaseButton,
  useColorModeValue,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useDeleteAccount } from '../../services/requests/authRequest';

const DeleteAccountScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const deleteAccountMutation = useDeleteAccount();

  const bgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const boxBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');
  const textColor = useColorModeValue('#FF4500', '#FF6347');
  const warningTextColor = useColorModeValue('#000000', '#FFFFFF');
  const inputBgColor = useColorModeValue('#FFF', '#2D2D2D');
  const inputBorderColor = useColorModeValue('#FF4500', '#FF6347');
  const placeholderColor = '#999';
  const dialogBgColor = useColorModeValue('#FFFAF0', '#2D2D2D');
  const dialogBorderColor = useColorModeValue('rgba(255,69,0,0.15)', 'rgba(255,255,255,0.1)');

  const handleDelete = () => {
    if (!password) {
      setError('Hesabınızı silmek için şifrenizi girmelisiniz');
      return;
    }
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAccountMutation.mutateAsync(password);
      await AsyncStorage.removeItem('token');
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
    } catch (error) {
      setError(error.message || 'Şifre yanlış');
      setIsOpen(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={[styles.container, { backgroundColor: bgColor }]} keyboardShouldPersistTaps="handled">
          <Box p={4}>
            <VStack space={4}>
              <Box bg={boxBgColor} p={4} rounded="xl" mb={4}>
                <Text style={{ color: textColor, fontWeight: 'bold', marginBottom: 8 }}>⚠️ Dikkat</Text>
                <Text style={{ color: warningTextColor }}>
                  Hesabınızı silmek geri alınamaz bir işlemdir. Tüm verileriniz kalıcı olarak silinecektir.
                </Text>
              </Box>

              <FormControl isInvalid={!!error}>
                <FormControl.Label _text={{ color: warningTextColor }}>
                  Şifrenizi Girin
                </FormControl.Label>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="Şifrenizi girin"
                    placeholderTextColor={placeholderColor}
                    style={[styles.input, { backgroundColor: inputBgColor, borderColor: inputBorderColor, color: warningTextColor }]}
                  />
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={textColor}
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{error}</FormControl.ErrorMessage>
              </FormControl>

              <Button onPress={handleDelete} bg="#ff0000" _pressed={{ bg: '#ff2400' }} mt={4}>
                Hesabımı Sil
              </Button>
            </VStack>

            <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <AlertDialog.Content bg={dialogBgColor} borderWidth={1} borderColor={dialogBorderColor}>
                <AlertDialog.Header bg={dialogBgColor} borderBottomWidth={1} borderBottomColor={dialogBorderColor}>
                  <Text style={{ color: textColor, fontSize: 18, fontWeight: '600' }}>Hesap Silme Onayı</Text>
                </AlertDialog.Header>
                <AlertDialog.Body bg={dialogBgColor}>
                  <Text style={{ color: warningTextColor }}>
                    Bu işlem geri alınamaz. Hesabınızı silmek istediğinize emin misiniz?
                  </Text>
                </AlertDialog.Body>
                <AlertDialog.Footer bg={dialogBgColor} borderTopWidth={1} borderTopColor={dialogBorderColor}>
                  <NativeBaseButton.Group space={2}>
                    <NativeBaseButton variant="outline" borderColor={textColor} _text={{ color: textColor }} onPress={() => setIsOpen(false)}>
                      İptal
                    </NativeBaseButton>
                    <NativeBaseButton bg="#DC3545" _pressed={{ bg: '#C82333' }} onPress={confirmDelete}>
                      Sil
                    </NativeBaseButton>
                  </NativeBaseButton.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Box>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default DeleteAccountScreen;