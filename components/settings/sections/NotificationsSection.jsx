import React from 'react';
import { VStack, HStack, Text, Switch, useColorModeValue } from 'native-base';
import SettingsSection from '../SettingsSection';

const NotificationsSection = ({ values, onChange }) => {
  const textColor = useColorModeValue('#000000', '#FFFFFF');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const offTrackColor = useColorModeValue('#666666', '#404040');

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
              <Text color={textColor}>Ses</Text>
              <Switch 
                isChecked={values.sound}
                onToggle={() => onChange(prev => ({...prev, sound: !prev.sound}))}
                onTrackColor={accentColor}
                offTrackColor={offTrackColor}
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color={textColor}>Titreşim</Text>
              <Switch 
                isChecked={values.vibration}
                onToggle={() => onChange(prev => ({...prev, vibration: !prev.vibration}))}
                onTrackColor={accentColor}
                offTrackColor={offTrackColor}
              />
            </HStack>
            <HStack justifyContent="space-between" alignItems="center">
              <Text color={textColor}>Rahatsız Etme Modu</Text>
              <Switch 
                isChecked={values.silent}
                onToggle={() => onChange(prev => ({...prev, silent: !prev.silent}))}
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
