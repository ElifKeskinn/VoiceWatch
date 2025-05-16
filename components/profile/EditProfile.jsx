import React from 'react';
import {
  VStack,
  Input,
  Text,
  Button,
  Icon,
  Divider,
  HStack,
  Box,
  Image,
} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import GeneralModal from '../common/GeneralModal';
import {useColorModeValue} from 'native-base';
import {useUpdateUserProfile} from '../../services/requests/userUpdateRequest';
import noProfileImg from '../../assets/noprofile.png';

const EditProfileModal = ({
  isOpen,
  onClose,
  userData,
  onUserDataChange,
  onPickImage,
  onSuccess,
}) => {
  const updateProfileMutation = useUpdateUserProfile();

  const handleSubmit = async () => {
    try {
      const updateData = {
        name: userData.name,
        surname: userData.surname,
        age: userData.age,
        bloodGroup: userData.bloodGroup,
        profilePic: userData.profilePic,
      };

      await updateProfileMutation.mutateAsync(updateData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // Renkleri uygulamanın ana temasıyla eşleştir
  const bgColor = useColorModeValue('#FFFAF0', '#121212');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const inputBgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', '#1E1E1E');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');

  return (
    <GeneralModal
      isOpen={isOpen}
      onClose={onClose}
      title="Profil Bilgilerini Düzenle"
      onConfirm={handleSubmit}
      size="lg"
      bg={bgColor}
      confirmText="Kaydet"
      confirmIsLoading={updateProfileMutation.isLoading}
      confirmButtonProps={{
        bg: accentColor,
        _pressed: {bg: useColorModeValue('#FF8C00', '#FF7F50')},
      }}>
      <VStack space={4}>
        <Box alignItems="center">
          <Image
            source={
              userData.profilePic
                ? {uri: userData.profilePic}
                : noProfileImg
            }
            alt="Profile"
            size="xl"
            borderRadius="full"
            borderWidth={2}
            borderColor={`${accentColor}20`}
          />
          <Button
            leftIcon={<Icon as={Ionicons} name="camera" size="sm" />}
            onPress={onPickImage}
            variant="ghost"
            _text={{color: accentColor}}
            mt={2}>
            Fotoğrafı Değiştir
          </Button>
        </Box>

        <Divider />

        <VStack space={3}>
          <Input
            placeholder="Ad"
            value={userData.name}
            onChangeText={text => onUserDataChange('name', text)}
            borderColor={accentColor}
            bg={inputBgColor}
            color={textColor}
            _focus={{
              borderColor: accentColor,
              bg: inputBgColor,
            }}
            leftElement={
              <Icon
                as={Ionicons}
                name="person-outline"
                size="sm"
                color={accentColor}
                ml={2}
              />
            }
          />
          <Input
            placeholder="Soyad"
            value={userData.surname}
            onChangeText={text => onUserDataChange('surname', text)}
            borderColor={accentColor}
            bg={inputBgColor}
            color={textColor}
            _focus={{
              borderColor: accentColor,
              bg: inputBgColor,
            }}
            leftElement={
              <Icon
                as={Ionicons}
                name="person-outline"
                size="sm"
                color={accentColor}
                ml={2}
              />
            }
          />
          <Input
            placeholder="Yaş"
            value={userData.age?.toString()}
            onChangeText={text => onUserDataChange('age', text)}
            keyboardType="numeric"
            borderColor={accentColor}
            bg={inputBgColor}
            color={textColor}
            _focus={{
              borderColor: accentColor,
              bg: inputBgColor,
            }}
            leftElement={
              <Icon
                as={Ionicons}
                name="calendar-outline"
                size="sm"
                color={accentColor}
                ml={2}
              />
            }
          />
          <Input
            placeholder="Kan Grubu"
            value={userData.bloodGroup}
            onChangeText={text => onUserDataChange('bloodGroup', text)}
            borderColor={accentColor}
            bg={inputBgColor}
            color={textColor}
            _focus={{
              borderColor: accentColor,
              bg: inputBgColor,
            }}
            leftElement={
              <Icon
                as={Ionicons}
                name="water-outline"
                size="sm"
                color={accentColor}
                ml={2}
              />
            }
          />
        </VStack>
      </VStack>
    </GeneralModal>
  );
};

export default EditProfileModal;
