import React from 'react';
import SettingsSection from '../SettingsSection';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {Center, Text, VStack, Box,HStack, Icon, Pressable} from 'native-base';


const AccountButton = ({ icon, title, description, onPress, variant = "solid" }) => (
    <Pressable 
      onPress={onPress}
      mb={3}
    >
      <Box 
        bg={variant === "solid" ? "#FF4500" : "transparent"}
        borderWidth={variant === "outline" ? 1 : 0}
        borderColor={variant === "outline" ? "#FF4500" : "transparent"}
        rounded="xl"
        p={4}
        shadow={variant === "solid" ? 2 : 0}
      >
        <HStack space={4} alignItems="center">
          <Center
            bg={variant === "solid" ? "rgba(255,255,255,0.2)" : "rgba(255,69,0,0.1)"}
            p={2}
            rounded="lg"
          >
            <Icon 
              as={Ionicons} 
              name={icon} 
              size="md" 
              color={variant === "solid" ? "white" : "#FF4500"} 
            />
          </Center>
          <VStack flex={1}>
            <Text 
              fontSize="md" 
              fontWeight="600" 
              color={variant === "solid" ? "white" : "#00000"}
            >
              {title}
            </Text>
            <Text 
              fontSize="sm" 
              color={variant === "solid" ? "rgba(255,255,255,0.8)" : "#666666"}
            >
              {description}
            </Text>
          </VStack>
          <Icon 
            as={Ionicons} 
            name="chevron-forward" 
            size="sm" 
            color={variant === "solid" ? "white" : "#FF4500"} 
          />
        </HStack>
      </Box>
    </Pressable>
  );

const AccountSection = ({ onPasswordChange, onDeleteAccount }) => (
  <SettingsSection title="Hesap ve Güvenlik" icon="shield-checkmark">
    <VStack space={2}>
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
