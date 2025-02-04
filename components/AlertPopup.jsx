import React, { useEffect, useState, useCallback } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AlertPopup = ({ visible, type, onCancel, onConfirm, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = React.useRef(null);

  useEffect(() => {
    if (visible) {
      setTimeLeft(30);
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            requestAnimationFrame(() => {
              onTimeout?.();
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimeLeft(30);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible, onTimeout]);

  const getAlertInfo = () => {
    switch (type) {
      case 'silence':
        return {
          icon: 'volume-off',
          title: 'Uzun Süreli Sessizlik Algılandı!',
          color: '#FF4500',
        };
      case 'glass':
        return {
          icon: 'broken-image',
          title: 'Cam Kırılma Sesi Algılandı!',
          color: '#FF0000',
        };
      case 'fall':
        return {
          icon: 'warning',
          title: 'Düşme Sesi Algılandı!',
          color: '#FFA500',
        };
      case 'scream':
        return {
          icon: 'record-voice-over',
          title: 'Çığlık Sesi Algılandı!',
          color: '#FF0000',
        };
      default:
        return {
          icon: 'warning',
          title: 'Uyarı!',
          color: '#FF4500',
        };
    }
  };

  const alertInfo = getAlertInfo();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.alertBox, { borderColor: alertInfo.color }]}>
          <MaterialIcons name={alertInfo.icon} size={40} color={alertInfo.color} />
          <Text style={[styles.title, { color: alertInfo.color }]}>{alertInfo.title}</Text>
          
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{timeLeft}</Text>
            <Text style={styles.timerLabel}>saniye</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>İptal Et</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton, { backgroundColor: alertInfo.color }]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>
                Kontakları Bilgilendir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  timerLabel: {
    fontSize: 18,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#FF4500',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  confirmButtonText: {
    color: 'white',
  },
});

export default AlertPopup; 