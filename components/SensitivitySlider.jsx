import React, { useState } from 'react';
import { Box, HStack, VStack, Text, Slider, Pressable, Icon, Collapse } from 'native-base';
import { SENSITIVITY_LEVELS } from '../constants/sensitivity';
import {Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const sensitivityInfo = {
  LOW: {
    title: "Düşük Hassasiyet",
    icon: "volume-low",
    description: "Sadece yüksek sesli gürültüleri algılar",
    recommendation: "Gürültülü ortamlarda kullanım için idealdir"
  },
  MEDIUM: {
    title: "Orta Hassasiyet",
    icon: "volume-medium",
    description: "Normal konuşma seviyesindeki sesleri algılar",
    recommendation: "Günlük kullanım için en uygun seviyedir"
  },
  HIGH: {
    title: "Yüksek Hassasiyet",
    icon: "volume-high",
    description: "En küçük sesleri bile algılar",
    recommendation: "Sessiz ortamlarda maksimum farkındalık sağlar"
  }
};

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
      <Box bg="#faf1e6" p={5} rounded="2xl" shadow={2} borderWidth={1} borderColor="rgba(255,69,0,0.15)">
        {/* Current Level Display */}
        <VStack space={6} alignItems="center" mb={6}>
          <Icon
            as={Ionicons}
            name={getLevelLabel().icon}
            size={12}
            color="#FF4500"
          />
          <Text fontSize="2xl" fontWeight="600" color="#00000">
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
            <Slider.Track bg="rgba(255,69,0,0.2)">
              <Slider.FilledTrack bg="#FF4500" />
            </Slider.Track>
            <Slider.Thumb bg="white" shadow={3} size={6} />
          </Slider>
          <HStack justifyContent="space-between" mt={2}>
            <Text color="#FF8C00">Az</Text>
            <Text color="#FF8C00">Orta</Text>
            <Text color="#FF8C00">Yüksek</Text>
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
              color="#FF4500"
            />
            <Text color="#FF4500" fontWeight="500">
              {isInfoVisible ? "Bilgileri Gizle" : "Daha Fazla Bilgi"}
            </Text>
          </HStack>
        </Pressable>

        {/* Info Panel */}
        <Collapse isOpen={isInfoVisible}>
          <VStack space={4} p={4} bg="rgba(255,69,0,0.1)" rounded="xl">
            {Object.entries(sensitivityInfo).map(([level, info]) => (
              <Box key={level} mb={4}>
                <HStack space={3} alignItems="center" mb={2}>
                  <Icon as={Ionicons} name={info.icon} size="md" color="#FF4500" />
                  <Text fontSize="md" fontWeight="600" color="#00000">
                    {info.title}
                  </Text>
                </HStack>
                <VStack space={2} pl={8}>
                  <Text fontSize="sm" color="#666666">{info.description}</Text>
                  <HStack space={2} alignItems="center">
                    <Icon as={Ionicons} name="checkmark-circle" size="xs" color="#FF4500" />
                    <Text fontSize="sm" color="#666666">{info.recommendation}</Text>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </VStack>
        </Collapse>
      </Box>
    </Animated.View>
  );
}
