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
  Spinner,
} from 'native-base';
import ProfileCard from '../components/profile/ProfileCard';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import EditProfileModal from '../components/profile/EditProfile';
import {useGetUserInfo} from '../services/queries/userInfoRequest';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const {data: userInfo, isLoading, error} = useGetUserInfo();
  const [contacts, setContacts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  React.useEffect(() => {
    if (userInfo) {
      setEditUser(userInfo);
      setContacts(
        userInfo.emergencyContacts.map((contact, index) => ({
          id: index + 1,
          name: contact.contactInfo,
          phone: contact.contactNumber,
        })),
      );
    }
  }, [userInfo]);

  const toast = useToast();

  const bgColor = useColorModeValue('#FFF2E6', '#121212');
  const cardBgColor = useColorModeValue('#faf1e6', '#1E1E1E');
  const contentBgColor = useColorModeValue('#FFF8F0', '#2D2D2D');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue(
    'rgba(255,69,0,0.15)',
    'rgba(255,255,255,0.1)',
  );
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const iconBgColor = useColorModeValue(
    'rgba(255,69,0,0.1)',
    'rgba(255,99,71,0.15)',
  );
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
                  <Icon
                    as={Ionicons}
                    name="person"
                    size="md"
                    color={accentColor}
                  />
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
                  <Icon
                    as={Ionicons}
                    name="create"
                    size="sm"
                    color={accentColor}
                  />
                </Pressable>
                <Pressable
                  p={2}
                  rounded="full"
                  _pressed={{bg: iconBgColor}}
                  onPress={() => handleDeleteContact(contact.id)}>
                  <Icon
                    as={Ionicons}
                    name="trash"
                    size="sm"
                    color={accentColor}
                  />
                </Pressable>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );

  return (
    <ScrollView
      contentContainerStyle={[styles.container, {backgroundColor: bgColor}]}>
      <Center flex={1} width="100%">
        {isLoading ? (
          <Spinner size="lg" color={useColorModeValue('#FF4500', '#FF6347')} />
        ) : error ? (
          <Text color="red.500">Profil bilgileri yüklenemedi</Text>
        ) : userInfo ? (
          <>
            <ProfileCard
              firstName={userInfo.name}
              lastName={userInfo.surname}
              tcNumber={userInfo.tcKimlik}
              age={userInfo.age}
              phoneNumber={userInfo.phoneNumber}
              bloodType={userInfo.bloodGroup}
              profileImage={userInfo.profilePic}
              sensitivity={userInfo.sensitivity?.toString()}
              onEdit={handleEditProfile}
            />
            <EmergencyContactSection />
          </>
        ) : null}

        {editUser && (
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUserUpdate}
            userData={editUser}
            onUserDataChange={handleUserDataChange}
            onPickImage={handlePickImage}
            darkMode={useColorModeValue(false, true)}
          />
        )}
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
