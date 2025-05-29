import React from 'react';
import { VStack, HStack, Text, Switch, useColorModeValue } from 'native-base';
import SettingsSection from '../SettingsSection';

const NotificationsSection = ({ values, onChange }) => {
  const textColor = useColorModeValue('#000000', '#FFFFFF');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const offTrackColor = useColorModeValue('#666666', '#404040');

  const handleSoundToggle = () => {
    onChange(prev => ({
      ...prev, 
      sound: !prev.sound,
      // Ses açıldığında titreşimi kapat
      vibration: !prev.sound ? false : prev.vibration
    }));
  };

  const handleVibrationToggle = () => {
    onChange(prev => ({
      ...prev, 
      vibration: !prev.vibration,
      // Titreşim açıldığında sesi kapat
      sound: !prev.vibration ? false : prev.sound
    }));
  };

  return (
    <SettingsSection title="Bildirim Ayarları" icon="notifications">
      <VStack space={4} mt={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text color={textColor}>Bildirimleri Etkinleştir</Text>
          <Switch 
            isChecked={values.enabled} 
            onToggle={() => onChange(prev => ({...prev, enabled: !prev.enabled}))}
            onTrackColor={accentColor}
            offTrackColor={offTrackColor}
          />
        </HStack>
        {values.enabled && (
          <VStack space={3}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color={textColor}>Sesli Bildirim</Text>
              <Switch 
                isChecked={values.sound}
                onToggle={handleSoundToggle}
                onTrackColor={accentColor}
                offTrackColor={offTrackColor}
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color={textColor}>Titreşimli Bildirim</Text>
              <Switch 
                isChecked={values.vibration}
                onToggle={handleVibrationToggle}
                onTrackColor={accentColor}
                offTrackColor={offTrackColor}
              />
            </HStack>
          </VStack>
        )}
      </VStack>
    </SettingsSection>
  );
};

export default NotificationsSection;
