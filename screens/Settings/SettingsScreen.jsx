import {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { Button } from 'native-base';
import {
  useColorMode,
  Text,
  VStack,
  Box,
  HStack,
  Icon,
  Pressable,
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {SENSITIVITY_LEVELS} from '../../constants/sensitivity';
import SensitivitySection from '../../components/settings/sections/SensitivitySection';
import NotificationsSection from '../../components/settings/sections/NotificationsSection';
import AppearanceSection from '../../components/settings/sections/AppearanceSection';
import AccountSection from '../../components/settings/sections/AccountSection';
import AboutSection from '../../components/settings/sections/AboutSection';
import LogoutModal from '../../components/common/LogoutModal';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {colorMode, toggleColorMode} = useColorMode();
  const [sensitivity, setSensitivity] = useState(
    SENSITIVITY_LEVELS.MEDIUM.value,
  );
  const [notifications, setNotifications] = useState({
    enabled: true,
    sound: true,
    vibration: true,
    silent: false,
  });

  // Karanlık mod durumunu yerel state'te tutuyoruz
  const [darkMode, setDarkMode] = useState(colorMode === 'dark');

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toggleColorMode();
  };

  const bgColor = darkMode ? '#121212' : '#FFF2E6';

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: bgColor}]}>
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

        <Pressable onPress={() => setShowLogoutModal(true)} mb={4} mt={2}>
          <Box
            bg={darkMode ? 'rgba(255,99,71,0.1)' : 'transparent'}
            borderWidth={1}
            borderColor={darkMode ? '#FF6347' : '#FF4500'}
            rounded="xl"
            p={4}>
            <HStack space={4} alignItems="center">
              <Box
                bg={darkMode ? 'rgba(255,99,71,0.2)' : 'rgba(255,69,0,0.1)'}
                p={2}
                rounded="lg">
                <Icon
                  as={Ionicons}
                  name="log-out"
                  size="md"
                  color={darkMode ? '#FF6347' : '#FF4500'}
                />
              </Box>
              <Text
                fontSize="md"
                fontWeight="600"
                color={darkMode ? '#FFFFFF' : '#000000'}>
                Çıkış Yap
              </Text>
            </HStack>
          </Box>
        </Pressable>

        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});

export default SettingsScreen;
