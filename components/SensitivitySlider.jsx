import React, { useState } from 'react';
import { Box, HStack, VStack, Text, Slider, Pressable, Icon, Collapse } from 'native-base';
import { SENSITIVITY_LEVELS } from '../constants/sensitivity';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SensitivitySlider({ value, onChange }) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const getCurrentSliderValue = () => {
    switch (value) {
      case SENSITIVITY_LEVELS.LOW.value:
        return 1;
      case SENSITIVITY_LEVELS.HIGH.value:
        return 3;
      default:
        return 2;
    }
  };

  const handleChange = (sliderValue) => {
    if (sliderValue <= 1) {
      onChange(SENSITIVITY_LEVELS.LOW.value);
    } else if (sliderValue === 2) {
      onChange(SENSITIVITY_LEVELS.MEDIUM.value);
    } else {
      onChange(SENSITIVITY_LEVELS.HIGH.value);
    }
  };

  const getLevelLabel = () => {
    switch (value) {
      case SENSITIVITY_LEVELS.LOW.value:
        return { text: "Düşük Hassasiyet", icon: "volume-low" };
      case SENSITIVITY_LEVELS.HIGH.value:
        return { text: "Yüksek Hassasiyet", icon: "volume-high" };
      default:
        return { text: "Orta Hassasiyet", icon: "volume-medium" };
    }
  };

  return (
    <Animated.View entering={FadeIn}>
      <Box bg="white" p={5} rounded="xl" shadow={2}>
        {/* Current Level Display */}
        <VStack space={6} alignItems="center" mb={6}>
          <Icon
            as={Ionicons}
            name={getLevelLabel().icon}
            size={12}
            color="#007AFF"
          />
          <Text fontSize="2xl" fontWeight="600" color="#1C1C1E">
            {getLevelLabel().text}
          </Text>
        </VStack>

        {/* Slider */}
        <Box px={4} mb={6}>
          <Slider
            defaultValue={2}
            value={getCurrentSliderValue()}
            minValue={1}
            maxValue={3}
            step={1}
            onChange={handleChange}
          >
            <Slider.Track bg="#007AFF20">
              <Slider.FilledTrack bg="#007AFF" />
            </Slider.Track>
            <Slider.Thumb bg="white" shadow={2} size={6} />
          </Slider>
          <HStack justifyContent="space-between" mt={2}>
            <Text color="gray.500">Az</Text>
            <Text color="gray.500">Orta</Text>
            <Text color="gray.500">Yüksek</Text>
          </HStack>
        </Box>

        {/* Info Button */}
        <Pressable 
          onPress={() => setIsInfoVisible(!isInfoVisible)}
          mb={isInfoVisible ? 4 : 0}
        >
          <HStack 
            space={2} 
            alignItems="center" 
            justifyContent="center"
            py={2}
          >
            <Icon
              as={Ionicons}
              name="information-circle-outline"
              size={5}
              color="#007AFF"
            />
            <Text color="#007AFF" fontWeight="500">
              {isInfoVisible ? "Bilgileri Gizle" : "Daha Fazla Bilgi"}
            </Text>
          </HStack>
        </Pressable>

        {/* Info Panel */}
        <Collapse isOpen={isInfoVisible}>
          <VStack 
            space={4} 
            p={4} 
            bg="#007AFF10" 
            rounded="lg"
          >
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="volume-low" color="#007AFF" />
              <Text flex={1} fontSize="sm">Kalabalık ortamlar için ideal</Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="volume-medium" color="#007AFF" />
              <Text flex={1} fontSize="sm">Günlük kullanım için dengeli</Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="volume-high" color="#007AFF" />
              <Text flex={1} fontSize="sm">Sessiz ortamlar için hassas</Text>
            </HStack>
          </VStack>
        </Collapse>
      </Box>
    </Animated.View>
  );
}
