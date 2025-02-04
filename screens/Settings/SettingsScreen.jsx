import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {SENSITIVITY_LEVELS} from '../../constants/sensitivity';
import SensitivitySection from '../../components/settings/sections/SensitivitySection';
import NotificationsSection from '../../components/settings/sections/NotificationsSection';
import AppearanceSection from '../../components/settings/sections/AppearanceSection';
import AccountSection from '../../components/settings/sections/AccountSection';
import AboutSection from '../../components/settings/sections/AboutSection';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [sensitivity, setSensitivity] = useState(
    SENSITIVITY_LEVELS.MEDIUM.value,
  );
  const [notifications, setNotifications] = useState({
    enabled: true,
    sound: true,
    vibration: true,
    silent: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <VStack space={4} width="100%" p={4}>
        <SensitivitySection value={sensitivity} onChange={setSensitivity} />
        <NotificationsSection
          values={notifications}
          onChange={setNotifications}
        />
        <AppearanceSection darkMode={darkMode} onToggle={setDarkMode} />
        <AccountSection
          onPasswordChange={() => navigation.navigate('PasswordChange')}
          onDeleteAccount={() => navigation.navigate('DeleteAccount')}
        />
        <AboutSection />
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
});

export default SettingsScreen;
