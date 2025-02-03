import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { 
  Box, VStack, Text, Input, Icon, useToast,
  FormControl, WarningOutlineIcon, AlertDialog,
  Button as NativeBaseButton
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

const DeleteAccountScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleDelete = () => {
    if (!password) {
      setError('Hesabınızı silmek için şifrenizi girmelisiniz');
      return;
    }
    // Şifre kontrolü
    if (password !== "123ABC") { // Bu kısım API ile değiştirilecek
      setError('Girdiğiniz şifre yanlış');
      return;
    }
    setIsOpen(true);
  };

  const confirmDelete = () => {
    // Şifre doğruysa işleme devam et
    if (password === "123ABC") { // Bu kısım API ile değiştirilecek
      toast.show({
        title: "Hesap Silindi",
        description: "Hesabınız başarıyla silindi",
        status: "success",
        duration: 3000
      });
      navigation.replace('SignIn'); // Login yerine SignIn'e yönlendir
    } else {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      setIsOpen(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Box p={4}>
        <VStack space={4}>
          <Box bg="rgba(255,69,0,0.1)" p={4} rounded="xl" mb={4}>
            <Text color="#FF4500" fontWeight="bold" mb={2}>
              ⚠️ Dikkat
            </Text>
            <Text color="#FF4500">
              Hesabınızı silmek geri alınamaz bir işlemdir. Tüm verileriniz kalıcı olarak silinecektir.
            </Text>
          </Box>

          <FormControl isInvalid={!!error}>
            <FormControl.Label>Şifrenizi Girin</FormControl.Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChangeText={setPassword}
              InputRightElement={
                <Icon
                  as={Ionicons}
                  name={showPassword ? "eye-off" : "eye"}
                  size={5}
                  mr="2"
                  color="#FF4500"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              borderColor="#FF4500"
              _focus={{
                borderColor: "#FF8C00",
                bg: "transparent"
              }}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            onPress={handleDelete}
            bg="#ff0000"  
            _pressed={{ bg: "#ff2400" }}  
            mt={4}
          >
            Hesabımı Sil
          </Button>
        </VStack>

        <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <AlertDialog.Content bg="#FFFAF0" borderWidth={1} borderColor="rgba(255,69,0,0.15)">
            <AlertDialog.Header bg="#FFFAF0" borderBottomWidth={1} borderBottomColor="rgba(255,69,0,0.15)">
              <Text color="#FF4500" fontSize="lg" fontWeight="600">
                Hesap Silme Onayı
              </Text>
            </AlertDialog.Header>
            <AlertDialog.Body bg="#FFFAF0">
              <Text color="#666666">
                Bu işlem geri alınamaz. Hesabınızı silmek istediğinize emin misiniz?
              </Text>
            </AlertDialog.Body>
            <AlertDialog.Footer bg="#FFFAF0" borderTopWidth={1} borderTopColor="rgba(255,69,0,0.15)">
              <NativeBaseButton.Group space={2}>
                <NativeBaseButton
                  variant="outline"
                  borderColor="#FF4500"
                  _text={{ color: "#FF4500" }}
                  onPress={() => setIsOpen(false)}
                >
                  İptal
                </NativeBaseButton>
                <NativeBaseButton
                  bg="#DC3545"
                  _pressed={{ bg: "#C82333" }}
                  onPress={confirmDelete}
                >
                  Sil
                </NativeBaseButton>
              </NativeBaseButton.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  }
});

export default DeleteAccountScreen;
