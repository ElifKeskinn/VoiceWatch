import React from 'react';
import { Button as NBButton, Text } from 'native-base';

const Button = ({ onPress, children, variant = "solid", ...props }) => {
  const bgColor = variant === "solid" ? "#FF4500" : "transparent";
  const textColor = variant === "solid" ? "#FFFFFF" : "#FF4500" || "outline" ? "#FEF7EB" : "#FF4500"; 
  const borderColor = "#FF4500";

  return (
    <NBButton
      onPress={onPress}
      bg={bgColor}
      borderColor={borderColor}
      borderWidth={variant === "outline" ? 1 : 0}
      _pressed={{ bg: variant === "solid" ? "#FF8C00" : "rgba(255, 69, 0, 0.1)" }}
      {...props}
    >
      <Text color={textColor} fontWeight="bold" fontSize="lg"> {/* Increased font size */}
        {children}
      </Text>
    </NBButton>
  );
};

export default Button;
