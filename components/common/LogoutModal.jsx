import React from 'react';
import {
  Modal,
  VStack,
  Text,
  Button,
  useColorModeValue,
} from 'native-base';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  const bgColor = useColorModeValue('white', '#1A1A1A');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,255,255,0.1)');
  const buttonColor = useColorModeValue('#FF4500', '#FF6347');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content bg={bgColor} borderColor={borderColor} borderWidth={1}>
        <Modal.Header bg={bgColor} borderColor={borderColor}>
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Çıkış Yap
          </Text>
        </Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <Text color={textColor}>
              Hesabınızdan çıkış yapmak istediğinize emin misiniz?
            </Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer bg={bgColor} borderColor={borderColor}>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              onPress={onClose}
              _text={{
                color: buttonColor,
              }}>
              İptal
            </Button>
            <Button
              bg={buttonColor}
              onPress={onConfirm}
              _pressed={{
                bg: useColorModeValue('#FF8C00', '#FF7F50'),
              }}>
              Çıkış Yap
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default LogoutModal;
