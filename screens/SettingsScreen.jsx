import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Center, Text, VStack, Box, useToast, Switch, HStack, Divider, Icon, Input, Radio, Pressable, Slider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button'; 
import GeneralModal from '../components/GeneralModal';
import { SENSITIVITY_LEVELS } from '../constants/sensitivity';

const { height } = Dimensions.get('window');

const SettingsScreen = () => {
  const [sensitivity, setSensitivity] = useState(SENSITIVITY_LEVELS.MEDIUM.value);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();

  const handleAboutSupport = () => {
    toast.show({
      title: "Hakkında & Destek",
      description: "Bu özellik henüz aktif değil.",
      status: "info",
      duration: 3000,
    });
  };

  const handlePasswordChange = () => {
    // Bu kısım auth sistemi ile entegre edilecek
    if (oldPassword === "oldpassword") {
      toast.show({
        title: "Şifre başarıyla değiştirildi!",
        status: "success",
        duration: 3000,
      });
      setIsModalOpen(false);
    } else {
      toast.show({
        title: "Eski şifre yanlış!",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleSensitivityChange = (value) => {
    if (value <= 1) {
      setSensitivity(SENSITIVITY_LEVELS.LOW.value);
    } else if (value === 2) {
      setSensitivity(SENSITIVITY_LEVELS.MEDIUM.value);
    } else {
      setSensitivity(SENSITIVITY_LEVELS.HIGH.value);
    }
  };

  const getCurrentSliderValue = () => {
    switch (sensitivity) {
      case SENSITIVITY_LEVELS.LOW.value:
        return 1;
      case SENSITIVITY_LEVELS.HIGH.value:
        return 3;
      default:
        return 2;
    }
  };

  const SettingItem = ({ icon, title, value, onToggle, type = "switch" }) => (
    <HStack space={3} alignItems="center" justifyContent="space-between" width="100%" py={3}>
      <HStack space={3} alignItems="center">
        <Icon as={Ionicons} name={icon} size="md" color="#FF4500" />
        <Text fontSize="md">{title}</Text>
      </HStack>
      {type === "switch" && <Switch 
        isChecked={value} 
        onToggle={onToggle}
        colorScheme="orange"
      />}
    </HStack>
  );

  const SensitivityButton = ({ value, label }) => (
    <Pressable
      onPress={() => setSensitivity(value)}
      bg={sensitivity === value ? "rgba(255,69,0,0.9)" : "transparent"}
      borderWidth={1}
      borderColor="rgba(255,69,0,0.9)"
      rounded="md"
      px={4}
      py={2}
      my={1}
    >
      <Text
        color={sensitivity === value ? "white" : "rgba(255,69,0,0.9)"}
        fontWeight="500"
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Center flex={1} width="100%">
        <VStack space={4} width="90%" divider={<Divider />}>
          <Box>
            <HStack space={3} alignItems="center" mb={4}>
              <Icon as={Ionicons} name="options" size="md" color="#FF4500" />
              <Text fontSize="xl" fontWeight="bold">Hassasiyet Ayarı</Text>
            </HStack>
            <Box>
              {/* Sensitivity Level Labels */}
              <HStack justifyContent="space-between" mb={2}>
                <Text color="gray.600" fontSize="sm">Az</Text>
                <Text color="gray.600" fontSize="sm">Orta</Text>
                <Text color="gray.600" fontSize="sm">Hassas</Text>
              </HStack>
              
              <Slider
                defaultValue={2}
                value={getCurrentSliderValue()}
                minValue={1}
                maxValue={3}
                step={1}
                onChange={handleSensitivityChange}
                colorScheme="orange"
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
              
              <Text textAlign="right" mt={2} color="#FF4500" fontWeight="500">
                {Object.values(SENSITIVITY_LEVELS).find(level => level.value === sensitivity)?.label}
              </Text>
            </Box>
          </Box>

          <VStack space={2}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>Bildirimler</Text>
            <SettingItem 
              icon="notifications" 
              title="Bildirimler" 
              value={notifications} 
              onToggle={() => setNotifications(prev => !prev)} 
            />
            <SettingItem 
              icon="volume-high" 
              title="Ses" 
              value={soundEnabled} 
              onToggle={() => setSoundEnabled(prev => !prev)} 
            />
            <SettingItem 
              icon="phone-portrait" 
              title="Titreşim" 
              value={vibrationEnabled} 
              onToggle={() => setVibrationEnabled(prev => !prev)} 
            />
          </VStack>

          <VStack space={2}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>Görünüm</Text>
            <SettingItem 
              icon="moon" 
              title="Karanlık Mod" 
              value={darkMode} 
              onToggle={() => setDarkMode(prev => !prev)} 
            />
          </VStack>

          <VStack space={2}>
            <HStack space={3} alignItems="center" mb={2}>
              <Icon as={Ionicons} name="key" size="md" color="#FF4500" />
              <Text fontSize="xl" fontWeight="bold">Güvenlik</Text>
            </HStack>
            <Button 
              onPress={() => setIsModalOpen(true)}
              leftIcon={<Icon as={Ionicons} name="lock-closed" size="sm" />}
            >
              Şifre Değiştir
            </Button>
          </VStack>

          <Button 
            leftIcon={<Icon as={Ionicons} name="information-circle" size="sm" />}
            onPress={handleAboutSupport}
            mt={4}
          >
            Hakkında & Destek
          </Button>
        </VStack>

        <GeneralModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Şifre Değiştir" 
          onConfirm={handlePasswordChange}
        >
          <Input
            placeholder="Eski Parola"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry
            borderColor="#FF4500"
            _focus={{ borderColor: "#FF4500" }}
            mt={3}
          />
          <Input
            placeholder="Yeni Parola"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            borderColor="#FF4500"
            _focus={{ borderColor: "#FF4500" }}
            mt={3}
          />
        </GeneralModal>
      </Center>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFAF0',
    padding: 20,
    minHeight: height,
  },
});

export default SettingsScreen;