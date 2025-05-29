import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorModeValue } from 'native-base';

const { width } = Dimensions.get('window');

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  // Renk şemasını güncelle
  const modalBgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue('rgba(255,69,0,0.1)', 'rgba(255,255,255,0.1)');
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const buttonBgColor = useColorModeValue('#FFFAF0', '#2D2D2D');

  if (!isOpen) return null;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isOpen}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalBox, { backgroundColor: modalBgColor, borderColor }]}>
              <View style={styles.headerContainer}>
                <MaterialIcons name="logout" size={24} color={accentColor} />
                <Text style={[styles.title, { color: textColor }]}>Çıkış Yap</Text>
              </View>

              <View style={[styles.divider, { backgroundColor: borderColor }]} />

              <Text style={[styles.message, { color: textColor }]}>
                Hesabınızdan çıkış yapmak istediğinize emin misiniz?
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton, { borderColor: accentColor }]}
                  onPress={onClose}
                >
                  <Text style={[styles.buttonText, { color: accentColor }]}>Vazgeç</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.confirmButton, { backgroundColor: accentColor }]}
                  onPress={onConfirm}
                >
                  <MaterialIcons name="logout" size={20} color="white" />
                  <Text style={styles.confirmButtonText}>Çıkış Yap</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: width * 0.85,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    borderWidth: 1,
    marginRight: 8,
  },
  confirmButton: {
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default LogoutModal;
