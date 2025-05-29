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
import {MaterialIcons} from '@expo/vector-icons';
import {useColorModeValue} from 'native-base';
import {sendBulkSms} from '../services/requests/alertRequests';
import {useGetContacts} from '../services/requests/contactRequests';

const {width} = Dimensions.get('window');

export default function ManualAlertPopup({visible, onCancel}) {
  // Renk şemasını güncelle
  const modalBgColor = useColorModeValue('#FFFAF0', '#1A1A1A');
  const textColor = useColorModeValue('#000000', '#E8E8E8');
  const borderColor = useColorModeValue(
    'rgba(255,69,0,0.1)',
    'rgba(255,255,255,0.1)',
  );
  const accentColor = useColorModeValue('#FF4500', '#FF6347');
  const buttonBgColor = useColorModeValue('#FFFAF0', '#2D2D2D');

  const {data: contacts, isLoading} = useGetContacts();
  const numbers = Array.isArray(contacts)
    ? contacts.map(c => c.contactNumber)
    : [];

  const handleConfirm = async () => {
    onCancel();

    if (isLoading) {
      return Alert.alert('Bekleyin', 'Kontaklar yükleniyor…');
    }
    if (!numbers.length) {
      return Alert.alert('Hata', 'Gönderilecek kontak bulunamadı.');
    }

    try {
      // Sadece SMS endpoint’ine POST
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
      onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={[styles.backdrop, {backgroundColor: 'rgba(0,0,0,0.6)'}]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.alertBox,
                {
                  backgroundColor: modalBgColor,
                  borderColor: borderColor,
                  borderWidth: 1,
                },
              ]}>
              <View style={styles.headerContainer}>
                <MaterialIcons name="warning" size={24} color={accentColor} />
                <Text style={[styles.title, {color: textColor}]}>
                  Manuel Uyarı
                </Text>
              </View>

              <View style={[styles.divider, {backgroundColor: borderColor}]} />

              <Text style={[styles.message, {color: textColor}]}>
                Kontak kişilerine acil durum SMS'i gönderilecek. Emin misiniz?
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.cancelButton,
                    {
                      borderColor: accentColor,
                      backgroundColor: buttonBgColor,
                    },
                  ]}
                  onPress={onCancel}>
                  <Text style={[styles.buttonText, {color: accentColor}]}>
                    İptal
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.confirmButton,
                    {backgroundColor: accentColor},
                  ]}
                  onPress={handleConfirm}>
                  <MaterialIcons
                    name="notification-important"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.confirmButtonText}>Gönder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: width * 0.85,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
