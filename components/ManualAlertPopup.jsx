import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  StyleSheet,
} from 'react-native';
import { sendBulkSms } from '../services/requests/alertRequests';
import { useGetContacts } from '../services/requests/contactRequests';

const { width } = Dimensions.get('window');

export default function ManualAlertPopup({ visible, onCancel }) {
  // contacts içindeki doğru alan contactNumber
  const { data: contacts, isLoading } = useGetContacts();

  const handleConfirm = async () => {
    onCancel();

    if (isLoading) {
      return Alert.alert('Bekleyin', 'Kontaklar yükleniyor…');
    }

    // contactNumber alanını al, boşları at
    const numbers = Array.isArray(contacts)
      ? contacts
          .map(c => c.contactNumber)
          .filter(n => typeof n === 'string' && n.trim().length > 0)
      : [];

    console.log('[ManualAlertPopup] final numbers:', numbers);

    if (!numbers.length) {
      return Alert.alert('Hata', 'Gönderilecek kontak bulunamadı.');
    }

    try {
      console.log('[ManualAlertPopup] → sendBulkSms çağrılıyor', numbers);
      const smsRes = await sendBulkSms('Manuel acil durum bildirimi!', numbers);
      console.log('[ManualAlertPopup] ← sendBulkSms yanıt:', smsRes);

      Alert.alert('Başarılı', 'Tüm SMS’ler gönderildi.');
    } catch (err) {
      console.error('[ManualAlertPopup] HATA:', err);
      Alert.alert('Hata', err.message);
    }
  };

  if (!visible) return null;
  
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={localStyles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={localStyles.alertBox}>
              <Text style={localStyles.title}>Manuel Uyarı</Text>
              <Text style={localStyles.message}>
                Kontak kişilerine acil durum SMS’i gönderilecek. Emin misiniz?
              </Text>
              <View style={localStyles.buttonContainer}>
                <TouchableOpacity
                  style={[localStyles.button, localStyles.cancelButton]}
                  onPress={onCancel}
                >
                  <Text style={localStyles.cancelText}>Hayır</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[localStyles.button, localStyles.confirmButton]}
                  onPress={handleConfirm}
                >
                  <Text style={localStyles.confirmText}>Evet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const localStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#FF4500',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#FF4500',
    marginLeft: 8,
  },
  cancelText: {
    color: '#FF4500',
    fontWeight: '500',
  },
  confirmText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },

  title: { fontSize: 18, fontWeight: '500', textAlign: 'center', marginBottom: 12 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  cancelButton: { borderWidth: 1, borderColor: '#FF4500', marginRight: 8 },
  confirmButton: { backgroundColor: '#FF4500', marginLeft: 8 },
  cancelText: { color: '#FF4500', fontWeight: '500' },
  confirmText: { color: '#FFF', fontWeight: '500' },
});
