import React from 'react';
import {
  Box,
  AspectRatio,
  Image,
  Center,
  Stack,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Pressable,
  useColorModeValue,
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {SENSITIVITY_LEVELS} from '../../constants/sensitivity';

const ProfileCard = ({
  firstName,
  lastName,
  tcNumber,
  age,
  phoneNumber,
  bloodType,
  profileImage,
  sensitivity,
  onEdit,
}) => {
  const bgColor = useColorModeValue('#faf1e6', '#1E1E1E');
  const contentBgColor = useColorModeValue('#FFF8F0', '#2D2D2D');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue(
    'rgba(255,69,0,0.15)',
    'rgba(255,255,255,0.1)',
  );
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const iconColor = useColorModeValue('#FF4500', '#FF6347');

  const getSensitivityLabel = value => {
    return (
      Object.values(SENSITIVITY_LEVELS).find(level => level.value === value)
        ?.label || 'Orta'
    );
  };
  const imageSource = profileImage
    ? {uri: profileImage}
    : require('../../assets/noprofile.png');

  return (
    <Box alignItems="center" p="4" width="100%">
      <Box
        width="100%"
        maxW="500px"
        rounded="xl"
        overflow="hidden"
        borderColor={borderColor}
        borderWidth="2"
        bg={bgColor}
        p="6"
        shadow={1}>
        {/* Profile Image Section */}
        <Box alignItems="center" position="relative">
          <AspectRatio w="70%" ratio={1}>
            <Image
              source={imageSource}
              alt="Profile Image"
              borderRadius="full"
              borderWidth={2}
              borderColor="rgba(255,69,0,0.2)"
            />
          </AspectRatio>

          {/* Edit Button */}
          <Pressable
            position="absolute"
            bottom={0}
            right="20%"
            bg="rgba(255,69,0,0.9)"
            rounded="full"
            p={2}
            shadow={2}
            _pressed={{bg: 'rgba(255,69,0,0.7)'}}
            onPress={onEdit}>
            <Icon as={Ionicons} name="create-outline" size="sm" color="white" />
          </Pressable>
        </Box>

        {/* Profile Label */}
        <Box
          bg={accentColor}
          position="absolute"
          px="4"
          py="2"
          top={0}
          left={0}
          roundedBottomRight="lg">
          <Text color="white" fontWeight="700" fontSize="sm">
            PROFİL
          </Text>
        </Box>

        <Stack p="5" space={4}>
          <VStack space={3} alignItems="center">
            <Heading size="xl" color={textColor} fontWeight="bold">
              {firstName} {lastName}
            </Heading>
          </VStack>

          <VStack
            space={3}
            alignItems="flex-start"
            p={4}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            bg={contentBgColor}>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="id-card" size="sm" color={iconColor} />
              <Text fontSize="md" fontWeight="500" color={textColor}>
                TC: {tcNumber}
              </Text>
            </HStack>

            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="call" size="sm" color={iconColor} />
              <Text fontSize="md" fontWeight="500" color={textColor}>
                Telefon: {phoneNumber}
              </Text>
            </HStack>

            <HStack space={1} alignItems="center">
              <Icon as={Ionicons} name="water" size="sm" color={iconColor} />
              <Text fontSize="md" fontWeight="500" color={textColor}>
                Kan Grubu: {bloodType}
              </Text>
            </HStack>

            <HStack space={3} alignItems="center">
              <Icon
                as={Ionicons}
                name="alert-circle"
                size="sm"
                color={iconColor}
              />
              <Text fontSize="md" fontWeight="500" color={textColor}>
                Hassasiyet: {getSensitivityLabel(sensitivity)}
              </Text>
            </HStack>
            <HStack space={2} alignItems="center">
              <Icon as={Ionicons} name="calendar" size="sm" color={iconColor} />
              <Text fontSize="md" fontWeight="500" color={textColor}>
                Yaş: {age}
              </Text>
            </HStack>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileCard;
