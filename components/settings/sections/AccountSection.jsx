import React from 'react';
import SettingsSection from '../SettingsSection';
import { Ionicons } from '@expo/vector-icons';
import { Center, Text, VStack, Box, HStack, Icon, Pressable, useColorModeValue } from 'native-base';

const AccountButton = ({ icon, title, description, onPress, variant = "solid" }) => {
  const solidBgColor = useColorModeValue('#FF4500', '#FF6347');
  const outlineBgColor = useColorModeValue('transparent', 'rgba(255,99,71,0.1)');
  const outlineBorderColor = useColorModeValue('#FF4500', '#FF6347');
  const titleTextColor = variant === "solid" ? "white" : useColorModeValue('#000000', '#FFFFFF');
  const descriptionColor = useColorModeValue('#666666', '#D3D3D3');
  
  return (
    <Pressable onPress={onPress} mt={4}>
      <Box 
        bg={variant === "solid" ? solidBgColor : outlineBgColor}
        borderWidth={variant === "outline" ? 1 : 0}
        borderColor={variant === "outline" ? outlineBorderColor : "transparent"}
        rounded="xl"
        p={4}
        shadow={variant === "solid" ? 2 : 0}
      >
        <HStack space={2} alignItems="center">
          <Center
            bg={variant === "solid" ? "rgba(255,255,255,0.2)" : "rgba(255,99,71,0.1)"}
            p={2}
            rounded="lg"
          >
            <Icon 
              as={Ionicons} 
              name={icon} 
              size="md" 
              color={variant === "solid" ? "white" : outlineBorderColor} 
            />
          </Center>
          <VStack flex={1}>
            <Text 
              fontSize="md" 
              fontWeight="600" 
              color={titleTextColor}
            >
              {title}
            </Text>
            <Text 
              fontSize="sm" 
              color={variant === "solid" ? "rgba(255,255,255,0.8)" : descriptionColor}
            >
              {description}
            </Text>
          </VStack>
          <Icon 
            as={Ionicons} 
            name="chevron-forward" 
            size="sm" 
            color={variant === "solid" ? "white" : outlineBorderColor} 
          />
        </HStack>
      </Box>
    </Pressable>
  );
};

const AccountSection = ({ onPasswordChange, onDeleteAccount }) => (
  <SettingsSection title="Hesap ve Güvenlik" icon="shield-checkmark">
    <VStack >
      <AccountButton
        icon="key"
        title="Şifre Değiştir"
        description="Hesap güvenliğiniz için şifrenizi güncelleyin"
        onPress={onPasswordChange}
        variant="solid"
      />
      <AccountButton
        icon="trash"
        title="Hesabı Sil"
        description="Hesabınızı kalıcı olarak silin"
        onPress={onDeleteAccount}
        variant="outline"
      />
    </VStack>
  </SettingsSection>
);

export default AccountSection;
