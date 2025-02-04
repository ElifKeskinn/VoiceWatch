import React from 'react';
import { VStack, HStack, Text, Switch } from 'native-base';
import SettingsSection from '../SettingsSection';

const NotificationsSection = ({ values, onChange }) => (
  <SettingsSection title="Bildirim Ayarları" icon="notifications">
    <VStack space={4}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text color="#00000">Bildirimleri Etkinleştir</Text>
        <Switch 
          isChecked={values.enabled} 
          onToggle={() => onChange(prev => ({...prev, enabled: !prev.enabled}))}
          onTrackColor="#FF4500"
        />
      </HStack>
      {values.enabled && (
        <VStack space={3}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="#00000">Ses</Text>
            <Switch 
              isChecked={values.sound}
              onToggle={() => onChange(prev => ({...prev, sound: !prev.sound}))}
              onTrackColor="#FF4500"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="#00000">Titreşim</Text>
            <Switch 
              isChecked={values.vibration}
              onToggle={() => onChange(prev => ({...prev, vibration: !prev.vibration}))}
              onTrackColor="#FF4500"
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="#00000">Rahatsız Etme Modu</Text>
            <Switch 
              isChecked={values.silent}
              onToggle={() => onChange(prev => ({...prev, silent: !prev.silent}))}
              onTrackColor="#FF4500"
            />
          </HStack>
        </VStack>
      )}
    </VStack>
  </SettingsSection>
);

export default NotificationsSection;
