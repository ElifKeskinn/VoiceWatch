import React from 'react';
import { Box, AspectRatio, Image, Center, Stack, Heading, Text, VStack, HStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';  

const ProfileCard = ({ firstName, lastName, tcNumber, age, phoneNumber, bloodType, profileImage, sensitivity }) => {
  return (
    <Box alignItems="center" p="4" width="100%">
      <Box
        width="100%" 
        maxW="500px" 
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.300"
        borderWidth="1"
        _dark={{ borderColor: 'coolGray.600', backgroundColor: 'gray.700' }}
        _web={{ shadow: 3, borderWidth: 0 }}
        _light={{ backgroundColor: 'gray.50' }}
        p="6"
        bg={{
          linearGradient: {
            colors: ['#FFFAF0', '#FF4500'],
            start: [0, 0],
            end: [1, 1],
          },
        }}
      >
        <Box alignItems="center">
          <AspectRatio w="85%" ratio={1}>
            <Image source={profileImage} alt="Profile Image" />
          </AspectRatio>
        </Box>
        <Center
          bg="#FF4500"
          _dark={{ bg: '#FF8C00' }}
          _text={{ color: 'warmGray.50', fontWeight: '700', fontSize: 'sm' }}
          position="absolute"
          px="4"
          py="2"
        >
          PROFILE
        </Center>
        <Stack p="5" space={4}>
          <VStack space={3} alignItems="center">
            <Heading size="xl" color="#FF4500" fontWeight="bold">
              {firstName} {lastName}
            </Heading>
          </VStack>
          <VStack space={3} alignItems="flex-start">
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="id-card" size="sm" color="gray.700" />
              <Text fontSize="md" fontWeight="500" color="gray.700">TC: {tcNumber}</Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="call" size="sm" color="gray.700" />
              <Text fontSize="md" fontWeight="500" color="gray.700">Telefon: {phoneNumber}</Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="calendar" size="sm" color="gray.700" />
              <Text fontSize="md" fontWeight="500" color="gray.700">Yaş: {age}</Text>
              <Icon as={Ionicons} name="water" size="sm" color="gray.700" />
              <Text fontSize="md" fontWeight="500" color="gray.700">Kan Grubu: {bloodType}</Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="alert-circle" size="sm" color="gray.700" />
              <Text fontSize="md" fontWeight="500" color="gray.700">Hassasiyet: {sensitivity}</Text>
            </HStack>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileCard;
