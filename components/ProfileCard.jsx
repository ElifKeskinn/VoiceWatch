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
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';

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
  return (
    <Box alignItems="center" p="4" width="100%">
      <Box
        width="100%"
        maxW="500px"
        rounded="xl"
        overflow="hidden"
        borderColor="rgba(255,69,0,0.15)"
        borderWidth="1"
        bg="#FFF2E6"
        p="6"
        shadow={1}>
        {/* Profile Image Section */}
        <Box alignItems="center" position="relative">
          <AspectRatio w="70%" ratio={1}>
            <Image 
              source={profileImage} 
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
          bg="rgba(255,69,0,0.9)"
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
            <Heading size="xl" color="#FF4500" fontWeight="bold">
              {firstName} {lastName}
            </Heading>
          </VStack>

          <VStack
            space={3}
            alignItems="flex-start"
            p={4}
            borderRadius="lg"
            borderWidth={1}
            borderColor="rgba(255,69,0,0.15)"
            bg="#FFF8F0">
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="id-card" size="sm" color="#FF4500" />
              <Text fontSize="md" fontWeight="500">
                TC: {tcNumber}
              </Text>
            </HStack>

            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="call" size="sm" color="#FF4500" />
              <Text fontSize="md" fontWeight="500">
                Telefon: {phoneNumber}
              </Text>
            </HStack>

            <HStack space={1} alignItems="center">
              <Icon as={Ionicons} name="water" size="sm" color="#FF4500" />
              <Text fontSize="md" fontWeight="500">
                Kan Grubu: {bloodType}
              </Text>
            </HStack>

            <HStack space={3} alignItems="center">
              <Icon
                as={Ionicons}
                name="alert-circle"
                size="sm"
                color="#FF4500"
              />
              <Text fontSize="md" fontWeight="500">
                Hassasiyet: {sensitivity}
              </Text>
            </HStack>
            <HStack space={2} alignItems="center">
              <Icon as={Ionicons} name="calendar" size="sm" color="#FF4500" />
              <Text fontSize="md" fontWeight="500">
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
