import React from 'react';
import { Box, AspectRatio, Image, Center, Stack, Heading, Text, VStack, HStack, Icon, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';  

const ProfileCard = ({ firstName, lastName, tcNumber, age, phoneNumber, bloodType, profileImage, sensitivity, onEdit }) => {
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
        <Box alignItems="center" position="relative">
          <AspectRatio w="85%" ratio={1}>
            <Image 
              source={profileImage} 
              alt="Profile Image" 
              borderRadius={100}
            />
          </AspectRatio>
          <Button
            position="absolute"
            bottom={0}
            right={0}
            size="sm"
            rounded="full"
            bg="#FF4500"
            onPress={onEdit}
          >
            <Icon as={Ionicons} name="create" size="sm" color="white" />
          </Button>
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

          <VStack space={3} alignItems="flex-start" bg="rgba(255,255,255,0.6)" p={4} borderRadius="lg">
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="id-card" size="sm" color="#FF4500" />
              <Text fontSize="md" fontWeight="500">TC: {tcNumber}</Text>
            </HStack>

            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="call" size="sm" color="#FF4500" />
              <Text fontSize="md" fontWeight="500">Telefon: {phoneNumber}</Text>
            </HStack>

            <HStack space={3} alignItems="center" justifyContent="space-between" width="100%">
              <HStack space={2} alignItems="center">
                <Icon as={Ionicons} name="calendar" size="sm" color="#FF4500" />
                <Text fontSize="md" fontWeight="500">Yaş: {age}</Text>
              </HStack>
              
              <HStack space={2} alignItems="center">
                <Icon as={Ionicons} name="water" size="sm" color="#FF4500" />
                <Text fontSize="md" fontWeight="500">Kan Grubu: {bloodType}</Text>
              </HStack>
            </HStack>

            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="alert-circle" size="sm" color="#FF4500" />
              <Text fontSize="md" fontWeight="500">Hassasiyet: %{sensitivity}</Text>
            </HStack>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileCard;
