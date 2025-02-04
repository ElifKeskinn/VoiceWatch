import React from 'react';
import {VStack, Box, Text} from 'native-base';
import SettingsSection from '../SettingsSection';
import SensitivitySlider from '../SensitivitySlider';

const SensitivitySection = ({value, onChange}) => (
  <SettingsSection title="Hassasiyet Ayarları" icon="options" defaultOpen>
    <VStack space={4}>
      <SensitivitySlider value={value} onChange={onChange} />
      <Box bg="rgba(255,69,0,0.1)" p={3} rounded="xl">
        <Text fontSize="sm" color="#FF4500">
          İPUCU: Bulunduğunuz ortama göre hassasiyet ayarını
          değiştirebilirsiniz.
        </Text>
      </Box>
    </VStack>
  </SettingsSection>
);

export default SensitivitySection;
