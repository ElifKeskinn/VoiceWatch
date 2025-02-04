import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {VStack, useColorMode} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {SENSITIVITY_LEVELS} from '../../constants/sensitivity';
import SensitivitySection from '../../components/settings/sections/SensitivitySection';
import NotificationsSection from '../../components/settings/sections/NotificationsSection';
import AppearanceSection from '../../components/settings/sections/AppearanceSection';
import AccountSection from '../../components/settings/sections/AccountSection';
import AboutSection from '../../components/settings/sections/AboutSection';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [sensitivity, setSensitivity] = useState(SENSITIVITY_LEVELS.MEDIUM.value);
  const [notifications, setNotifications] = useState({
    enabled: true,
    sound: true,
    vibration: true,
    silent: false,
  });

  // Karanlık mod durumunu yerel state'te tutuyoruz
  const [darkMode, setDarkMode] = useState(colorMode === 'dark');

  // Karanlık mod değiştiğinde hem yerel state'i hem de NativeBase'in colorMode'unu güncelliyoruz
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toggleColorMode();
  };

  // Arka plan rengini karanlık moda göre ayarlıyoruz
  const bgColor = darkMode ? '#1A1A1A' : '#FFFAF0';
  const sectionBgColor = darkMode ? '#2D2D2D' : 'white';
  const textColor = darkMode ? '#FFFFFF' : '#000000';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <VStack space={4} width="100%" p={4}>
        <SensitivitySection 
          value={sensitivity} 
          onChange={setSensitivity}
          darkMode={darkMode}
        />
        <NotificationsSection
          values={notifications}
          onChange={setNotifications}
          darkMode={darkMode}
        />
        <AppearanceSection 
          darkMode={darkMode} 
          onToggle={handleDarkModeToggle}
        />
        <AccountSection
          onPasswordChange={() => navigation.navigate('PasswordChange')}
          onDeleteAccount={() => navigation.navigate('DeleteAccount')}
          darkMode={darkMode}
        />
        <AboutSection darkMode={darkMode} />
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
