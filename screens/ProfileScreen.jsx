import React, {useState} from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import {
  Center,
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
import {useGetUserInfo} from '../services/requests/userInfoRequest';
import {
  useGetContacts,
  useAddContact,
  useUpdateContact,
  useDeleteContact,
} from '../services/requests/contactRequests';
import AddContactModal from '../components/contacts/AddContactModal';
import EditContactModal from '../components/contacts/EditContactModal';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const {
    data: userInfo,
    isLoading: userLoading,
    error: userError,
  } = useGetUserInfo();
  const {
    data: contacts,
    isLoading: contactsLoading,
    refetch: refetchContacts,
  } = useGetContacts();
  const addContactMutation = useAddContact();
  const updateContactMutation = useUpdateContact();
  const deleteContactMutation = useDeleteContact();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const isDarkMode = useColorModeValue(false, true);

  React.useEffect(() => {
    if (userInfo) {
      setEditUser(userInfo);
    }
  }, [userInfo]);

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
    setIsAddContactModalOpen(true);
  };

  const handleEditContact = contact => {
    setEditingContact(contact);
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  // handlePickImage fonksiyonunu güncelle
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      // Tutarlı isimlendirme: profilePic kullan (profileImage değil)
      setEditUser(prev => ({
        ...prev,
        profilePic: result.assets[0].uri,
      }));
      console.log('🖼️ Yeni profil resmi seçildi:', result.assets[0].uri);
    }
  };

  const handleUserDataChange = (field, value) => {
    setEditUser(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddContactSubmit = async contactData => {
    try {
      await addContactMutation.mutateAsync(contactData);
      setIsAddContactModalOpen(false);
    } catch (error) {
      console.error('Add contact error:', error);
    }
  };

  const handleEditContactSubmit = async data => {
    try {
      await updateContactMutation.mutateAsync({
        id: editingContact.id,
        data: {
          contactInfo: data.contactInfo,
          contactNumber: data.contactNumber,
        },
      });
      setEditingContact(null);
    } catch (error) {
      console.error('Edit contact error:', error);
    }
  };

  const handleDeleteContact = async id => {
    try {
      await deleteContactMutation.mutateAsync(id);
    } catch (error) {
      console.error('Delete contact error:', error);
    }
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

        {contactsLoading ? (
          <Spinner size="lg" color={accentColor} />
        ) : contacts?.length > 0 ? (
          contacts.map(contact => (
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
                      {contact.contactInfo}
                    </Text>
                    <Text color={secondaryTextColor}>
                      {contact.contactNumber}
                    </Text>
                  </VStack>
                </HStack>

                <HStack space={2}>
                  <Pressable
                    p={2}
                    rounded="full"
                    _pressed={{bg: iconBgColor}}
                    onPress={() => handleEditContact(contact)}>
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
          ))
        ) : (
          <Text color={textColor}>Henüz kontak eklenmemiş</Text>
        )}

        <AddContactModal
          isOpen={isAddContactModalOpen}
          onClose={() => setIsAddContactModalOpen(false)}
          onSubmit={handleAddContactSubmit}
          isLoading={addContactMutation.isLoading}
        />
      </VStack>
    </Box>
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, {backgroundColor: bgColor}]}>
        <Center flex={1} width="100%">
          {userLoading ? (
            <Spinner
              size="lg"
              color={useColorModeValue('#FF4500', '#FF6347')}
            />
          ) : userError ? (
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
              darkMode={isDarkMode}
            />
          )}
        </Center>
      </ScrollView>
      <EditContactModal
        isOpen={!!editingContact}
        onClose={() => setEditingContact(null)}
        onSubmit={handleEditContactSubmit}
        contact={editingContact}
        isLoading={updateContactMutation.isLoading}
      />
    </>
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
