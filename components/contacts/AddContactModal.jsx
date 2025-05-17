import React, {useState} from 'react';
import {VStack, Icon, Text, useColorModeValue} from 'native-base';
import {TextInput, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import GeneralModal from '../common/GeneralModal';

const AddContactModal = ({isOpen, onClose, onSubmit, isLoading}) => {
  const [contactInfo, setContactInfo] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errors, setErrors] = useState({
    contactInfo: '',
    contactNumber: '',
  });

  const formatPhoneNumber = number => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 0) return '';

    let formatted = '+' + cleaned;
    if (cleaned.length > 2)
      formatted = formatted.slice(0, 3) + ' ' + formatted.slice(3);
    if (cleaned.length > 5)
      formatted = formatted.slice(0, 7) + ' ' + formatted.slice(7);
    if (cleaned.length > 8)
      formatted = formatted.slice(0, 11) + ' ' + formatted.slice(11);
    if (cleaned.length > 10)
      formatted = formatted.slice(0, 14) + ' ' + formatted.slice(14);

    return formatted;
  };

  const handlePhoneNumberChange = value => {
    const formattedNumber = formatPhoneNumber(value);
    setContactNumber(formattedNumber);
    setErrors(prev => ({...prev, contactNumber: ''}));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      contactInfo: '',
      contactNumber: '',
    };

    if (!contactInfo || contactInfo.trim() === '') {
      newErrors.contactInfo = 'Kontak ismi boş olamaz';
      isValid = false;
    }

    if (!contactNumber) {
      newErrors.contactNumber = 'Telefon numarası boş olamaz';
      isValid = false;
    } else if (contactNumber.length < 16) {
      newErrors.contactNumber = 'Telefon numarası eksik girilmiştir';
      isValid = false;
    } else if (!contactNumber.startsWith('+90 5')) {
      newErrors.contactNumber = 'Telefon numarası +90 5 ile başlamalıdır';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        contactInfo,
        contactNumber,
      });
      setContactInfo('');
      setContactNumber('');
      setErrors({contactInfo: '', contactNumber: ''});
    }
  };

  const bgColor = useColorModeValue('#FFFAF0', '#121212');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const inputBgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', '#1E1E1E');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const errorColor = useColorModeValue('#FF0000', '#FF6666');

  const inputStyle = (hasError) => ({
    height: 30,
    borderColor: hasError ? errorColor : accentColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: textColor,
    backgroundColor: inputBgColor,
    flex: 1,
  });

  return (
    <GeneralModal
      isOpen={isOpen}
      onClose={onClose}
      title="Acil Durum Kontağı Ekle"
      onConfirm={handleSubmit}
      size="lg"
      bg={bgColor}
      confirmText="Ekle"
      confirmIsLoading={isLoading}
      confirmButtonProps={{
        bg: accentColor,
        _pressed: {bg: useColorModeValue('#FF8C00', '#FF7F50')},
      }}>
      <VStack space={4}>
        <VStack>
          <View style={{flexDirection: 'row', alignItems: 'center',width: '95%'}}>
            <Icon
              as={Ionicons}
              name="person-outline"
              size="sm"
              color={errors.contactInfo ? errorColor : accentColor}
              ml={2}
              mr={1}
            />
            <TextInput
              placeholder="İsim"
              placeholderTextColor={textColor}
              value={contactInfo}
              onChangeText={text => {
                setContactInfo(text);
                setErrors(prev => ({...prev, contactInfo: ''}));
              }}
              style={inputStyle(errors.contactInfo)}
            />
          </View>
          {errors.contactInfo && (
            <Text color={errorColor} fontSize="xs" mt={1}>
              {errors.contactInfo}
            </Text>
          )}
        </VStack>

        <VStack>
          <View style={{flexDirection: 'row', alignItems: 'center',width: '95%'}}>
            <Icon
              as={Ionicons}
              name="call-outline"
              size="sm"
              color={errors.contactNumber ? errorColor : accentColor}
              ml={2}
              mr={1}
            />
            <TextInput
              placeholder="Telefon Numarası (+90 555 555 55 55)"
              placeholderTextColor={textColor}
              value={contactNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              maxLength={17}
              style={inputStyle(errors.contactNumber)}
            />
          </View>
          {errors.contactNumber && (
            <Text color={errorColor} fontSize="xs" mt={1}>
              {errors.contactNumber}
            </Text>
          )}
        </VStack>
      </VStack>
    </GeneralModal>
  );
};

export default AddContactModal;
