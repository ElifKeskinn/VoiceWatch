import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  alertBox: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
  },
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  headerIcon: {
    marginBottom: 4,
    opacity: 0.9,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 16,
    width: '100%',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '600',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 69, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  timerLabel: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
    fontWeight: '400',
  },
  buttonContainer: {
    marginTop: 16,
    gap: 10,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmButton: {
    backgroundColor: '#FF4500',
  },
  buttonIcon: {
    marginRight: 6,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FF4500',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  confirmButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}); 