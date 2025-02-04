import React, {useState} from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  Slider,
  Pressable,
  Icon,
  Collapse,
  useColorModeValue,
} from 'native-base';
import {SENSITIVITY_LEVELS} from '../../constants/sensitivity';
import {Ionicons} from '@expo/vector-icons';
import Animated, {FadeIn} from 'react-native-reanimated';

const sensitivityInfo = {
  LOW: {
    title: 'Düşük Hassasiyet',
    icon: 'volume-low',
    description: 'Sadece yüksek sesli gürültüleri algılar',
    recommendation: 'Gürültülü ortamlarda kullanım için idealdir',
  },
  MEDIUM: {
    title: 'Orta Hassasiyet',
    icon: 'volume-medium',
    description: 'Normal konuşma seviyesindeki sesleri algılar',
    recommendation: 'Günlük kullanım için en uygun seviyedir',
  },
  HIGH: {
    title: 'Yüksek Hassasiyet',
    icon: 'volume-high',
    description: 'En küçük sesleri bile algılar',
    recommendation: 'Sessiz ortamlarda maksimum farkındalık sağlar',
  },
};

export default function SensitivitySlider({value, onChange}) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  // Karanlık mod renkleri
  const bgColor = useColorModeValue('#faf1e6', '#2D2D2D');
  const textColor = useColorModeValue('#000000', '#FFFFFF');
  const descriptionColor = useColorModeValue('#666666', '#D3D3D3');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const borderColor = useColorModeValue('rgba(255,69,0,0.15)', 'rgba(255,255,255,0.1)');
  const sliderTrackBg = useColorModeValue('rgba(255,69,0,0.2)', 'rgba(255,99,71,0.3)');
  const infoPanelBg = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');
  const levelColor = useColorModeValue('#FF8C00', '#FFA07A');

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

  const handleChange = sliderValue => {
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
        return {text: 'Düşük Hassasiyet', icon: 'volume-low'};
      case SENSITIVITY_LEVELS.HIGH.value:
        return {text: 'Yüksek Hassasiyet', icon: 'volume-high'};
      default:
        return {text: 'Orta Hassasiyet', icon: 'volume-medium'};
    }
  };

  return (
    <Animated.View entering={FadeIn}>
      <Box
        bg={bgColor}
        p={5}
        rounded="2xl"
        shadow={2}
        borderWidth={1}
        borderColor={borderColor}>
        {/* Current Level Display */}
        <VStack space={6} alignItems="center" mb={6}>
          <Icon
            as={Ionicons}
            name={getLevelLabel().icon}
            size={12}
            color={accentColor}
          />
          <Text fontSize="2xl" fontWeight="600" color={textColor}>
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
            onChange={handleChange}>
            <Slider.Track bg={sliderTrackBg}>
              <Slider.FilledTrack bg={accentColor} />
            </Slider.Track>
            <Slider.Thumb bg="white" shadow={3} size={6} />
          </Slider>
          <HStack justifyContent="space-between" mt={2}>
            <Text color={levelColor}>Az</Text>
            <Text color={levelColor}>Orta</Text>
            <Text color={levelColor}>Yüksek</Text>
          </HStack>
        </Box>

        {/* Info Button */}
        <Pressable
          onPress={() => setIsInfoVisible(!isInfoVisible)}
          mb={isInfoVisible ? 4 : 0}>
          <HStack space={2} alignItems="center" justifyContent="center" py={2}>
            <Icon
              as={Ionicons}
              name="information-circle-outline"
              size={5}
              color={accentColor}
            />
            <Text color={accentColor} fontWeight="500">
              {isInfoVisible ? 'Bilgileri Gizle' : 'Daha Fazla Bilgi'}
            </Text>
          </HStack>
        </Pressable>

        {/* Info Panel */}
        <Collapse isOpen={isInfoVisible}>
          <VStack space={4} p={4} bg={infoPanelBg} rounded="xl">
            {Object.entries(sensitivityInfo).map(([level, info]) => (
              <Box key={level} mb={4}>
                <HStack space={3} alignItems="center" mb={2}>
                  <Icon
                    as={Ionicons}
                    name={info.icon}
                    size="md"
                    color={accentColor}
                  />
                  <Text fontSize="md" fontWeight="600" color={textColor}>
                    {info.title}
                  </Text>
                </HStack>
                <VStack space={2} pl={8}>
                  <Text fontSize="sm" color={descriptionColor}>
                    {info.description}
                  </Text>
                  <HStack space={2} alignItems="center">
                    <Icon
                      as={Ionicons}
                      name="checkmark-circle"
                      size="xs"
                      color={accentColor}
                    />
                    <Text fontSize="sm" color={descriptionColor}>
                      {info.recommendation}
                    </Text>
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
