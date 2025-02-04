import React, { useState } from 'react';
import { Box, HStack, Icon, Text, Pressable, Collapse, Heading, useColorModeValue } from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const SettingsSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const bgColor = useColorModeValue('white', '#2D2D2D');
  const titleColor = useColorModeValue('#FF4500', '#FF6347');
  const iconBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.2)');
  const borderColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,255,255,0.1)');

  return (
    <Animated.View entering={FadeIn}>
      <Box 
        bg={bgColor} 
        rounded="xl" 
        p={4} 
        mb={4}
        borderWidth={1}
        borderColor={borderColor}
        shadow={2}
      >
        <Pressable onPress={() => setIsOpen(!isOpen)}>
          <HStack space={2} mb={4} alignItems="center">
            <Box
              bg={iconBgColor}
              p={2}
              rounded="lg"
            >
              <Icon 
                as={Ionicons} 
                name={icon} 
                size="md" 
                color={titleColor} 
              />
            </Box>
            <Heading size="sm" color={titleColor}>
              {title}
            </Heading>
          </HStack>
        </Pressable>
        <Collapse isOpen={isOpen}>
          <Box px={4} pb={4}>
            {children}
          </Box>
        </Collapse>
      </Box>
    </Animated.View>
  );
};

export default SettingsSection;
