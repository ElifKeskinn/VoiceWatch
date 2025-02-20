import React, {useState, useEffect} from 'react';
import {
  Modal,
  FormControl,
  Input,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from 'native-base';

const EditContactModal = ({isOpen, onClose, onSubmit, contact, isLoading}) => {
  const [formData, setFormData] = useState({
    contactInfo: '',
    contactNumber: '',
  });
  const [phoneError, setPhoneError] = useState('');

  // Format phone number
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

  // Handle phone number change
  const handlePhoneChange = value => {
    const formattedNumber = formatPhoneNumber(value);
    setFormData(prev => ({
      ...prev,
      contactNumber: formattedNumber,
    }));
    setPhoneError('');

    // Validate phone number
    if (formattedNumber && !formattedNumber.startsWith('+90 5')) {
      setPhoneError('Telefon numarası +90 5 ile başlamalıdır');
    } else if (formattedNumber && formattedNumber.length < 17) {
      setPhoneError('Telefon numarası eksik');
    }
  };

  // Contact data değiştiğinde form verilerini güncelle
  useEffect(() => {
    if (contact) {
      setFormData({
        contactInfo: contact.contactInfo || '',
        contactNumber: contact.contactNumber || '',
      });
    }
  }, [contact]);

  const handleSubmit = () => {
    if (!formData.contactInfo || !formData.contactNumber) {
      return;
    }

    // Final validation before submit
    if (
      !formData.contactNumber.startsWith('+90 5') ||
      formData.contactNumber.length < 17
    ) {
      setPhoneError('Geçerli bir telefon numarası giriniz');
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Form datayı resetle
  const handleClose = () => {
    setFormData({
      contactInfo: '',
      contactNumber: '',
    });
    onClose();
  };

  // Theme colors
  const modalBg = useColorModeValue('#faf1e6', '#1E1E1E');
  const inputBg = useColorModeValue('#FFF8F0', '#2D2D2D');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const labelColor = useColorModeValue('#666666', '#B0B0B0');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const borderColor = useColorModeValue(
    'rgba(255,69,0,0.15)',
    'rgba(255,255,255,0.1)',
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content maxWidth="400px" bg={modalBg}>
        <Modal.CloseButton _icon={{color: textColor}} />
        <Modal.Header
          bg={modalBg}
          borderBottomWidth={1}
          borderBottomColor={borderColor}
          _text={{color: textColor, fontWeight: 'bold'}}>
          Kontağı Düzenle
        </Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <FormControl isRequired>
              <FormControl.Label _text={{color: labelColor}}>
                İsim
              </FormControl.Label>
              <Input
                value={formData.contactInfo}
                onChangeText={value => handleChange('contactInfo', value)}
                placeholder="Kontak ismini giriniz"
                fontSize="md"
                bg={inputBg}
                color={textColor}
                borderColor={borderColor}
                _focus={{
                  borderColor: accentColor,
                  backgroundColor: inputBg,
                }}
              />
            </FormControl>
            <FormControl isRequired isInvalid={!!phoneError}>
              <FormControl.Label _text={{color: labelColor}}>
                Telefon
              </FormControl.Label>
              <Input
                value={formData.contactNumber}
                onChangeText={handlePhoneChange}
                placeholder="+90 5XX XXX XX XX"
                keyboardType="phone-pad"
                fontSize="md"
                maxLength={17}
                bg={inputBg}
                color={textColor}
                borderColor={phoneError ? 'red.500' : borderColor}
                _focus={{
                  borderColor: phoneError ? 'red.500' : accentColor,
                  backgroundColor: inputBg,
                }}
              />
              {phoneError && (
                <FormControl.ErrorMessage>
                  {phoneError}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer
          bg={modalBg}
          borderTopWidth={1}
          borderTopColor={borderColor}>
          <HStack space={2}>
            <Button
              variant="ghost"
              onPress={handleClose}
              _text={{color: labelColor}}
              _pressed={{
                bg: useColorModeValue(
                  'rgba(255,69,0,0.1)',
                  'rgba(255,99,71,0.15)',
                ),
              }}>
              İptal
            </Button>
            <Button
              isLoading={isLoading}
              isDisabled={!formData.contactInfo || !formData.contactNumber}
              onPress={handleSubmit}
              bg={accentColor}
              _pressed={{
                bg: useColorModeValue('#FF6347', '#FF4500'),
              }}
              _text={{color: 'white'}}
              _loading={{
                bg: accentColor,
                opacity: 0.7,
              }}
              _disabled={{
                bg: useColorModeValue('gray.300', 'gray.600'),
                opacity: 0.5,
              }}>
              Güncelle
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default EditContactModal;
