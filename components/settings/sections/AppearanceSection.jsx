import React from 'react';
import { VStack, HStack, Text, Switch, useColorModeValue } from 'native-base';
import SettingsSection from '../SettingsSection';

const AppearanceSection = ({ darkMode, onToggle }) => {
  const textColor = useColorModeValue('#000000', '#FFFFFF');
  
  return (
    <SettingsSection title="Görünüm" icon="color-palette">
      <VStack space={4} mt={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text color={textColor}>Karanlık Mod</Text>
          <Switch 
            isChecked={darkMode}
            onToggle={onToggle}
            onTrackColor="#FF4500"
            offTrackColor="#666666"
          />
        </HStack>
      </VStack>
    </SettingsSection>
  );
};

export default AppearanceSection;
