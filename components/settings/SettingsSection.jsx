import React, { useState } from 'react';
import { Box, HStack, Icon, Text, Pressable, Collapse } from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

const SettingsSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Animated.View entering={FadeIn}>
      <Box 
        bg="#faf1e6" 
        rounded="2xl" 
        shadow={2} 
        overflow="hidden" 
        mb={4}
        borderWidth={1}
        borderColor="rgba(255,69,0,0.15)"
      >
        <Pressable onPress={() => setIsOpen(!isOpen)}>
          <HStack p={4} justifyContent="space-between" alignItems="center">
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name={icon} size="md" color="#FF4500" />
              <Text fontSize="lg" fontWeight="600" color="#00000">{title}</Text>
            </HStack>
            <Icon 
              as={MaterialIcons} 
              name={isOpen ? "expand-less" : "expand-more"} 
              size="md" 
              color="#FF8C00" 
            />
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
