import React, { useState } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { 
  Center, Text, VStack, Box, useToast, Switch, 
  HStack, Icon, Input, Pressable, Collapse 
} from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Button from '../components/Button';
import GeneralModal from '../components/GeneralModal';
import SensitivitySlider from '../components/SensitivitySlider';
import { SENSITIVITY_LEVELS } from '../constants/sensitivity';
import Animated, { FadeIn } from 'react-native-reanimated';

const SettingsSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Animated.View entering={FadeIn}>
      <Box bg="white" rounded="xl" shadow={2} overflow="hidden" mb={4}>
        <Pressable onPress={() => setIsOpen(!isOpen)}>
          <HStack p={4} justifyContent="space-between" alignItems="center">
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name={icon} size="md" color="#007AFF" />
              <Text fontSize="lg" fontWeight="600" color="#1C1C1E">{title}</Text>
            </HStack>
            <Icon 
              as={MaterialIcons} 
              name={isOpen ? "expand-less" : "expand-more"} 
              size="md" 
              color="gray.400" 
            />
          </HStack>
        </Pressable>
        <Collapse isOpen={isOpen}>
          <Box px={4} pb={4}>
            {children}
          </Box>
        </Collapse>
      </Box>
    </Animated.View>
  );
};

const SettingsScreen = () => {
  const [sensitivity, setSensitivity] = useState(SENSITIVITY_LEVELS.MEDIUM.value);
  const [notifications, setNotifications] = useState({
    enabled: true,
    sound: true,
    vibration: true,
    silent: false
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  return (
    <ScrollView style={styles.container}>
      <VStack space={4} width="100%" p={4}>
        {/* Sensitivity Section */}
        <SettingsSection title="Hassasiyet Ayarları" icon="options" defaultOpen>
          <VStack space={4}>
            <SensitivitySlider value={sensitivity} onChange={setSensitivity} />
            <Box bg="#007AFF10" p={3} rounded="md">
              <Text fontSize="sm" color="#007AFF">
                İPUCU: Bulunduğunuz ortama göre hassasiyet ayarını değiştirebilirsiniz.
              </Text>
            </Box>
          </VStack>
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection title="Bildirim Ayarları" icon="notifications">
          <VStack space={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="#1C1C1E">Bildirimleri Etkinleştir</Text>
              <Switch 
                isChecked={notifications.enabled} 
                onToggle={() => setNotifications(prev => ({...prev, enabled: !prev.enabled}))}
                onTrackColor="#007AFF"
              />
            </HStack>
            <Collapse isOpen={notifications.enabled}>
              <VStack space={3}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="#1C1C1E">Ses</Text>
                  <Switch 
                    isChecked={notifications.sound}
                    onToggle={() => setNotifications(prev => ({...prev, sound: !prev.sound}))}
                    onTrackColor="#007AFF"
                  />
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text>Titreşim</Text>
                  <Switch 
                    isChecked={notifications.vibration}
                    onToggle={() => setNotifications(prev => ({...prev, vibration: !prev.vibration}))}
                    colorScheme="orange"
                  />
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text>Rahatsız Etme Modu</Text>
                  <Switch 
                    isChecked={notifications.silent}
                    onToggle={() => setNotifications(prev => ({...prev, silent: !prev.silent}))}
                    colorScheme="orange"
                  />
                </HStack>
              </VStack>
            </Collapse>
          </VStack>
        </SettingsSection>

        {/* Appearance Section */}
        <SettingsSection title="Görünüm" icon="color-palette">
          <VStack space={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text>Karanlık Mod</Text>
              <Switch 
                isChecked={darkMode}
                onToggle={() => setDarkMode(!darkMode)}
                colorScheme="orange"
              />
            </HStack>
          </VStack>
        </SettingsSection>

        {/* Security Section */}
        <SettingsSection title="Güvenlik" icon="shield-checkmark">
          <Button 
            onPress={() => setIsModalOpen(true)}
            leftIcon={<Icon as={Ionicons} name="lock-closed" size="sm" />}
            bg="#007AFF"
            _pressed={{ bg: "#0066CC" }}
          >
            Şifre Değiştir
          </Button>
        </SettingsSection>

        {/* About & Support */}
        <SettingsSection title="Hakkında & Destek" icon="information-circle">
          <VStack space={4}>
            <Text color="#1C1C1E">Uygulama Versiyonu: 1.0.0</Text>
            <Button 
              variant="outline" 
              borderColor="#007AFF"
              _text={{ color: "#007AFF" }}
            >
              Destek Al
            </Button>
            <Button 
              variant="outline"
              borderColor="#007AFF"
              _text={{ color: "#007AFF" }}
            >
              Geri Bildirim Gönder
            </Button>
          </VStack>
        </SettingsSection>
      </VStack>

      <GeneralModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Şifre Değiştir"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  }
});

export default SettingsScreen;