import {
  Modal,
  Button,
  useColorModeValue,
  ScrollView,
} from 'native-base';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const GeneralModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Kaydet',
  size = 'lg',
  confirmIsLoading,
  confirmButtonProps,
}) => {
  const bgColor = useColorModeValue('#FFFAF0', '#121212');
  const headerBgColor = useColorModeValue('#FFF2E6', '#1A1A1A');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue(
    'rgba(255,69,0,0.15)',
    'rgba(255,255,255,0.1)'
  );
  const accentColor = useColorModeValue('#FF4500', '#FF6347');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <Modal.Content bg={bgColor} borderWidth={1} borderColor={borderColor}>
        <Modal.CloseButton _icon={{ color: textColor }} />
        <Modal.Header
          bg={headerBgColor}
          borderBottomWidth={1}
          borderBottomColor={borderColor}
          _text={{ color: textColor }}
        >
          {title}
        </Modal.Header>
        <Modal.Body>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {children}
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal.Body>
        <Modal.Footer
          bg={headerBgColor}
          borderTopWidth={1}
          borderTopColor={borderColor}
        >
          <Button.Group space={2}>
            <Button
              variant="outline"
              onPress={onClose}
              borderColor={accentColor}
              _text={{ color: accentColor }}
            >
              İptal
            </Button>
            <Button
              onPress={onConfirm}
              bg={accentColor}
              isLoading={confirmIsLoading}
              _pressed={{ bg: useColorModeValue('#FF8C00', '#FF7F50') }}
              {...confirmButtonProps}
            >
              {confirmText}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default GeneralModal;
