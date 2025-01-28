import React from 'react';
import { Box, AspectRatio, Image, Center, Stack, Heading, Text, VStack } from 'native-base';

const ProfileCard = ({ firstName, lastName, tcNumber, age, phoneNumber, bloodType, profileImage, sensitivity }) => {
  return (
    <Box alignItems="center" p="4" width="100%">
      <Box
        width="100%" 
        maxW="400px"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.300"
        borderWidth="1"
        _dark={{ borderColor: 'coolGray.600', backgroundColor: 'gray.700' }}
        _web={{ shadow: 3, borderWidth: 0 }}
        _light={{ backgroundColor: 'gray.50' }}
        p="6"
      >
        <Box>
          <AspectRatio w="100%" ratio={1}>  
            <Image source={profileImage} alt="Profile Image" />
          </AspectRatio>
          <Center
            bg="#FF4500"
            _dark={{ bg: '#FF8C00' }}
            _text={{ color: 'warmGray.50', fontWeight: '700', fontSize: 'sm' }}
            position="absolute"
            bottom="0"
            px="4"
            py="2"
          >
            PROFILE
          </Center>
        </Box>
        <Stack p="5" space={4}>
          <VStack space={3} alignItems="center">
            <Heading size="lg" color="#FF4500">
              {firstName} {lastName}
            </Heading>
            <Text fontSize="md" fontWeight="500" color="gray.700">TC: {tcNumber}</Text>
            <Text fontSize="md" fontWeight="500" color="gray.700">Yaş: {age}</Text>
            <Text fontSize="md" fontWeight="500" color="gray.700">Telefon: {phoneNumber}</Text>
            <Text fontSize="md" fontWeight="500" color="gray.700">Kan Grubu: {bloodType}</Text>
            <Text fontSize="md" fontWeight="500" color="gray.700">Hassasiyet: {sensitivity}</Text>
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileCard;
