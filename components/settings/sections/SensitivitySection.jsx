import React from 'react';
import {VStack, Box, Text, useColorModeValue} from 'native-base';
import SettingsSection from '../SettingsSection';
import SensitivitySlider from '../SensitivitySlider';

const SensitivitySection = ({value, onChange}) => {
  const tipBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');
  const tipTextColor = useColorModeValue('#FF4500', '#FF6347');

  return (
    <SettingsSection title="Hassasiyet Ayarları" icon="options" defaultOpen>
      <VStack space={4}>
        <SensitivitySlider value={value} onChange={onChange} />
        <Box bg={tipBgColor} p={3} rounded="xl">
          <Text fontSize="sm" color={tipTextColor}>
            İPUCU: Bulunduğunuz ortama göre hassasiyet ayarını
            değiştirebilirsiniz.
          </Text>
        </Box>
      </VStack>
    </SettingsSection>
  );
};

export default SensitivitySection;
