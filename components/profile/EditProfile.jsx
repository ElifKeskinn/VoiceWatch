import React from 'react';
import {VStack, Input, Text, Button, Icon, Divider, HStack} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import GeneralModal from '../common/GeneralModal';
import {useColorModeValue} from 'native-base';

const EditProfileModal = ({
  isOpen,
  onClose,
  onSubmit,
  userData,
  onUserDataChange,
  onPickImage,
}) => {
  const bgColor = useColorModeValue('#FFFFFF', '#1E1E1E');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue('#FF4500', '#FF6347');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const inputBgColor = useColorModeValue('transparent', '#2D2D2D');

  return (
    <GeneralModal
      isOpen={isOpen}
      onClose={onClose}
      title="Profil Bilgilerini Düzenle"
      onConfirm={onSubmit}
      size="lg"
      bg={bgColor}>
      <VStack space={4}>
        {/* Profil Fotoğrafı Değiştirme */}
        <Button
          leftIcon={<Icon as={Ionicons} name="camera" size="sm" />}
          onPress={onPickImage}
          bg={accentColor}
          _pressed={{opacity: 0.8}}>
          Profil Fotoğrafını Değiştir
        </Button>

        <Divider />

        {/* Kişisel Bilgiler */}
        <VStack space={4}>
          <HStack alignItems="center" space={2}>
            <Icon as={Ionicons} name="person" size="sm" color={accentColor} />
            <Text fontSize="md" fontWeight="bold" color={textColor}>
              Kişisel Bilgiler
            </Text>
          </HStack>

          <VStack space={3}>
            <Input
              placeholder="Ad"
              value={userData.firstName}
              onChangeText={text => onUserDataChange('firstName', text)}
              borderColor={borderColor}
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
              value={userData.lastName}
              onChangeText={text => onUserDataChange('lastName', text)}
              borderColor={borderColor}
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
              placeholder="TC Kimlik No"
              value={userData.tcNumber}
              onChangeText={text => onUserDataChange('tcNumber', text)}
              borderColor={borderColor}
              bg={inputBgColor}
              color={textColor}
              _focus={{
                borderColor: accentColor,
                bg: inputBgColor,
              }}
              leftElement={
                <Icon
                  as={Ionicons}
                  name="id-card-outline"
                  size="sm"
                  color={accentColor}
                  ml={2}
                />
              }
            />
            <Input
              placeholder="Yaş"
              value={userData.age}
              onChangeText={text => onUserDataChange('age', text)}
              borderColor={borderColor}
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
              placeholder="Telefon Numarası"
              value={userData.phoneNumber}
              onChangeText={text => onUserDataChange('phoneNumber', text)}
              borderColor={borderColor}
              bg={inputBgColor}
              color={textColor}
              _focus={{
                borderColor: accentColor,
                bg: inputBgColor,
              }}
              leftElement={
                <Icon
                  as={Ionicons}
                  name="call-outline"
                  size="sm"
                  color={accentColor}
                  ml={2}
                />
              }
            />
            <Input
              placeholder="Kan Grubu"
              value={userData.bloodType}
              onChangeText={text => onUserDataChange('bloodType', text)}
              borderColor={borderColor}
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
            <Input
              placeholder="Hassasiyet"
              value={userData.sensitivity}
              onChangeText={text => onUserDataChange('sensitivity', text)}
              borderColor={borderColor}
              bg={inputBgColor}
              color={textColor}
              _focus={{
                borderColor: accentColor,
                bg: inputBgColor,
              }}
              leftElement={
                <Icon
                  as={Ionicons}
                  name="alert-circle-outline"
                  size="sm"
                  color={accentColor}
                  ml={2}
                />
              }
            />
          </VStack>
        </VStack>
      </VStack>
    </GeneralModal>
  );
};

export default EditProfileModal;
