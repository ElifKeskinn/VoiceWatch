import React, {useState} from 'react';
import {
  VStack,
  Text,
  Button,
  Icon,
  Divider,
  Box,
  Image,
  useColorModeValue,
  HStack,
} from 'native-base';
import {TextInput, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import GeneralModal from '../common/GeneralModal';
import {useUpdateUserProfile} from '../../services/requests/userUpdateRequest';
import noProfileImg from '../../assets/noprofile.png';
import CustomPicker from '../CustomPicker';

const bloodGroupOptions = [
  {label: 'A+', value: 'A+'},
  {label: 'A-', value: 'A-'},
  {label: 'B+', value: 'B+'},
  {label: 'B-', value: 'B-'},
  {label: 'AB+', value: 'AB+'},
  {label: 'AB-', value: 'AB-'},
  {label: '0+', value: '0+'},
  {label: '0-', value: '0-'},
];

const EditProfileModal = ({
  isOpen,
  onClose,
  userData,
  onUserDataChange,
  onPickImage,
  onSuccess,
}) => {
  const updateProfileMutation = useUpdateUserProfile();
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (
      !userData.name ||
      !userData.surname ||
      !userData.age ||
      !userData.bloodGroup
    ) {
      setError('Lütfen tüm alanları doldurunuz.');
      return;
    }

    try {
      setError('');
      const updateData = {
        name: userData.name,
        surname: userData.surname,
        age: userData.age,
        bloodGroup: userData.bloodGroup,
        profilePic: userData.profilePic,
      };

      const updatedUser = await updateProfileMutation.mutateAsync(updateData);
      onSuccess?.(updatedUser); // parent'ı anlık güncelle
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
      setError('Profil güncellenirken bir hata oluştu.');
    }
  };

  const bgColor = useColorModeValue('#FFFAF0', '#121212');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const inputBgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', '#1E1E1E');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');

  const inputStyle = {
    flex: 1,
    height: 40,
    width: '80%',
    color: textColor,
    backgroundColor: inputBgColor,
    borderWidth: 1,
    borderColor: accentColor,
    borderRadius: 10,
    paddingHorizontal: 10,
  };

  const renderInputWithIcon = (
    placeholder,
    value,
    onChange,
    iconName,
    keyboardType = 'default',
  ) => (
    <HStack alignItems="center" space={2} width={'95%'}>
      <Icon
        as={Ionicons}
        name={iconName}
        size="sm"
        color={accentColor}
        ml={1}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={accentColor}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        style={inputStyle}
      />
    </HStack>
  );

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
              userData.profilePic ? {uri: userData.profilePic} : noProfileImg
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

        {error ? (
          <Text color="red.500" fontSize="sm" textAlign="center">
            {error}
          </Text>
        ) : null}

        <VStack space={3}>
          {renderInputWithIcon(
            'Ad',
            userData.name,
            text => onUserDataChange('name', text),
            'person-outline',
          )}
          {renderInputWithIcon(
            'Soyad',
            userData.surname,
            text => onUserDataChange('surname', text),
            'person-outline',
          )}
          {renderInputWithIcon(
            'Yaş',
            userData.age?.toString(),
            text => onUserDataChange('age', text),
            'calendar-outline',
            'numeric',
          )}

          <HStack alignItems="center" space={2}>
            <Icon
              as={Ionicons}
              name="water-outline"
              size="sm"
              color={accentColor}
              ml={1}
            />
            <CustomPicker
              label="Kan Grubu"
              options={bloodGroupOptions}
              selectedValue={userData.bloodGroup}
              onValueChange={value => onUserDataChange('bloodGroup', value)}
            />
          </HStack>
        </VStack>
      </VStack>
    </GeneralModal>
  );
};

export default EditProfileModal;
