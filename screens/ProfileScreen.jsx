import React, {useState} from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  Center,
  Input,
  useToast,
  HStack,
  VStack,
  Text,
  Icon,
  Box,
  Pressable,
  useColorModeValue,
} from 'native-base';
import ProfileCard from '../components/profile/ProfileCard';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import EditProfileModal from '../components/profile/EditProfile';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    tcNumber: '12345678901',
    age: '30',
    phoneNumber: '555-555-5555',
    bloodType: 'A+',
    profileImage:
      'data:image/jpeg;base64,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',
    sensitivity: '5',
  });

  const [contacts, setContacts] = useState([
    {id: 1, name: 'Alice', phone: '555-1234'},
    {id: 2, name: 'Bob', phone: '555-5678'},
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(user);
  const toast = useToast();

  // Dark mod renkleri
  const bgColor = useColorModeValue('#FFF2E6', '#121212');
  const cardBgColor = useColorModeValue('#faf1e6', '#1E1E1E');
  const contentBgColor = useColorModeValue('#FFF8F0', '#2D2D2D');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue('rgba(255,69,0,0.15)', 'rgba(255,255,255,0.1)');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const iconBgColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,99,71,0.15)');
  const secondaryTextColor = useColorModeValue('#666666', '#B0B0B0');

  const handleUserUpdate = () => {
    setUser(editUser);
    setIsEditModalOpen(false);
  };

  const handleAddContact = () => {
    toast.show({
      title: 'Add Contact',
      description: 'This feature is not implemented yet.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditContact = id => {
    toast.show({
      title: 'Edit Contact',
      description: `Edit contact with id: ${id}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteContact = id => {
    toast.show({
      title: 'Delete Contact',
      description: `Delete contact with id: ${id}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditUser({...editUser, profileImage: result.assets[0].uri});
    }
  };

  const handleUserDataChange = (field, value) => {
    setEditUser(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const EmergencyContactSection = () => (
    <Box
      width="90%"
      p={4}
      borderRadius="xl"
      mt={6}
      borderWidth={2}
      borderColor={borderColor}
      bg={cardBgColor}
      shadow={1}>
      <VStack space={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack space={2} alignItems="center">
            <Icon as={Ionicons} name="people" size="md" color={accentColor} />
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              Acil Durum Kontakları
            </Text>
          </HStack>
          <Pressable
            onPress={handleAddContact}
            bg={accentColor}
            rounded="full"
            p={2}
            _pressed={{opacity: 0.8}}>
            <Icon as={Ionicons} name="add" size="sm" color="white" />
          </Pressable>
        </HStack>

        {contacts.map(contact => (
          <Box
            key={contact.id}
            p={3}
            borderRadius="md"
            borderWidth={1}
            borderColor={borderColor}
            bg={contentBgColor}>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space={3} alignItems="center">
                <Center bg={iconBgColor} p={2} rounded="full">
                  <Icon as={Ionicons} name="person" size="md" color={accentColor} />
                </Center>
                <VStack>
                  <Text fontWeight="600" color={textColor}>
                    {contact.name}
                  </Text>
                  <Text color={secondaryTextColor}>{contact.phone}</Text>
                </VStack>
              </HStack>

              <HStack space={2}>
                <Pressable
                  p={2}
                  rounded="full"
                  _pressed={{bg: iconBgColor}}
                  onPress={() => handleEditContact(contact.id)}>
                  <Icon as={Ionicons} name="create" size="sm" color={accentColor} />
                </Pressable>
                <Pressable
                  p={2}
                  rounded="full"
                  _pressed={{bg: iconBgColor}}
                  onPress={() => handleDeleteContact(contact.id)}>
                  <Icon as={Ionicons} name="trash" size="sm" color={accentColor} />
                </Pressable>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
      <Center flex={1} width="100%">
        <ProfileCard 
          {...user} 
          onEdit={handleEditProfile}
          darkMode={useColorModeValue(false, true)}
        />
        <EmergencyContactSection />

        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUserUpdate}
          userData={editUser}
          onUserDataChange={handleUserDataChange}
          onPickImage={handlePickImage}
          darkMode={useColorModeValue(false, true)}
        />
      </Center>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 30,
    minHeight: Dimensions.get('window').height,
  },
});

export default ProfileScreen;
