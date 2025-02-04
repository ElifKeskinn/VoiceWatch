import React from 'react';
import {HStack, Text, useColorModeValue} from 'native-base';

const Logo = ({size = 'md'}) => {
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');

  const sizes = {
    sm: {
      fontSize: 20,
      spacing: 1,
    },
    md: {
      fontSize: 24,
      spacing: 1.5,
    },
    lg: {
      fontSize: 28,
      spacing: 2,
    },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <HStack space={1} alignItems="center">
      <Text
        fontSize={currentSize.fontSize}
        fontWeight="300"
        letterSpacing={currentSize.spacing}
        color={textColor}>
        VOICE
      </Text>
      <Text
        fontSize={currentSize.fontSize}
        fontWeight="600"
        letterSpacing={currentSize.spacing}
        color={accentColor}>
        WATCHER
      </Text>
    </HStack>
  );
};

export default Logo; 