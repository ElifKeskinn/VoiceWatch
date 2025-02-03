import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';

const SettingsSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Animated.View entering={FadeIn}>
      <Box 
        bg="#faf1e6" 
        rounded="2xl" 
        shadow={2} 
        overflow="hidden" 
        mb={4}
        borderWidth={1}
        borderColor="rgba(255,69,0,0.15)"
      >
        <Pressable onPress={() => setIsOpen(!isOpen)}>
          <HStack p={4} justifyContent="space-between" alignItems="center">
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name={icon} size="md" color="#FF4500" />
              <Text fontSize="lg" fontWeight="600" color="#00000">{title}</Text>
            </HStack>
            <Icon 
              as={MaterialIcons} 
              name={isOpen ? "expand-less" : "expand-more"} 
              size="md" 
              color="#FF8C00" 
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

const AccountButton = ({ icon, title, description, onPress, variant = "solid" }) => (
  <Pressable 
    onPress={onPress}
    mb={3}
  >
    <Box 
      bg={variant === "solid" ? "#FF4500" : "transparent"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={variant === "outline" ? "#FF4500" : "transparent"}
      rounded="xl"
      p={4}
      shadow={variant === "solid" ? 2 : 0}
    >
      <HStack space={4} alignItems="center">
        <Center
          bg={variant === "solid" ? "rgba(255,255,255,0.2)" : "rgba(255,69,0,0.1)"}
          p={2}
          rounded="lg"
        >
          <Icon 
            as={Ionicons} 
            name={icon} 
            size="md" 
            color={variant === "solid" ? "white" : "#FF4500"} 
          />
        </Center>
        <VStack flex={1}>
          <Text 
            fontSize="md" 
            fontWeight="600" 
            color={variant === "solid" ? "white" : "#00000"}
          >
            {title}
          </Text>
          <Text 
            fontSize="sm" 
            color={variant === "solid" ? "rgba(255,255,255,0.8)" : "#666666"}
          >
            {description}
          </Text>
        </VStack>
        <Icon 
          as={Ionicons} 
          name="chevron-forward" 
          size="sm" 
          color={variant === "solid" ? "white" : "#FF4500"} 
        />
      </HStack>
    </Box>
  </Pressable>
);

const SettingsScreen = () => {
  const navigation = useNavigation();
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

  const handlePasswordChange = () => {
    navigation.navigate('PasswordChange');
  };

  const handleDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  };

  return (
    <ScrollView style={styles.container}>
      <VStack space={4} width="100%" p={4}>
        {/* Sensitivity Section */}
        <SettingsSection title="Hassasiyet Ayarları" icon="options" defaultOpen>
          <VStack space={4}>
            <SensitivitySlider value={sensitivity} onChange={setSensitivity} />
            <Box bg="rgba(255,69,0,0.1)" p={3} rounded="xl">
              <Text fontSize="sm" color="#FF4500">
                İPUCU: Bulunduğunuz ortama göre hassasiyet ayarını değiştirebilirsiniz.
              </Text>
            </Box>
          </VStack>
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection title="Bildirim Ayarları" icon="notifications">
          <VStack space={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="#00000">Bildirimleri Etkinleştir</Text>
              <Switch 
                isChecked={notifications.enabled} 
                onToggle={() => setNotifications(prev => ({...prev, enabled: !prev.enabled}))}
                onTrackColor="#FF4500"
              />
            </HStack>
            <Collapse isOpen={notifications.enabled}>
              <VStack space={3}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="#00000">Ses</Text>
                  <Switch 
                    isChecked={notifications.sound}
                    onToggle={() => setNotifications(prev => ({...prev, sound: !prev.sound}))}
                    onTrackColor="#FF4500"
                  />
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="#00000">Titreşim</Text>
                  <Switch 
                    isChecked={notifications.vibration}
                    onToggle={() => setNotifications(prev => ({...prev, vibration: !prev.vibration}))}
                    onTrackColor="#FF4500"
                  />
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="#00000">Rahatsız Etme Modu</Text>
                  <Switch 
                    isChecked={notifications.silent}
                    onToggle={() => setNotifications(prev => ({...prev, silent: !prev.silent}))}
                    onTrackColor="#FF4500"
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
              <Text color="#00000">Karanlık Mod</Text>
              <Switch 
                isChecked={darkMode}
                onToggle={() => setDarkMode(!darkMode)}
                onTrackColor="#FF4500"
              />
            </HStack>
          </VStack>
        </SettingsSection>

        {/* Hesap ve Güvenlik Section */}
        <SettingsSection title="Hesap ve Güvenlik" icon="shield-checkmark">
          <VStack space={2}>
            <AccountButton
              icon="key"
              title="Şifre Değiştir"
              description="Hesap güvenliğiniz için şifrenizi güncelleyin"
              onPress={handlePasswordChange}
              variant="solid"
            />
            <AccountButton
              icon="trash"
              title="Hesabı Sil"
              description="Hesabınızı kalıcı olarak silin"
              onPress={handleDeleteAccount}
              variant="outline"
            />
          </VStack>
        </SettingsSection>

        {/* About & Support */}
        <SettingsSection title="Hakkında & Destek" icon="information-circle">
          <VStack space={4}>
            <Text color="#00000">Uygulama Versiyonu: 1.0.0</Text>
            <Button 
              variant="outline" 
              borderColor="#FF4500"
              _text={{ color: "#FF4500" }}
            >
              Destek Al
            </Button>
            <Button 
              variant="outline"
              borderColor="#FF4500"
              _text={{ color: "#FF4500" }}
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
    backgroundColor: '#FFFAF0',
  }
});

export default SettingsScreen;