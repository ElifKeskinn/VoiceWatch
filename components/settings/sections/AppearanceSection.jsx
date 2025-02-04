import React from 'react';
import { VStack, HStack, Text, Switch } from 'native-base';
import SettingsSection from '../SettingsSection';

const AppearanceSection = ({ darkMode, onToggle }) => (
  <SettingsSection title="Görünüm" icon="color-palette">
    <VStack space={4}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text color="#00000">Karanlık Mod</Text>
        <Switch 
          isChecked={darkMode}
          onToggle={onToggle}
          onTrackColor="#FF4500"
        />
      </HStack>
    </VStack>
  </SettingsSection>
);

export default AppearanceSection;
