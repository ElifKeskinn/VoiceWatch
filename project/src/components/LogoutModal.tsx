import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface LogoutModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutModal({ visible, onConfirm, onCancel }: LogoutModalProps) {
  if (!visible) return null;

  return (
    <absoluteLayout style={styles.overlay}>
      <flexboxLayout style={styles.modal}>
        <label style={styles.title}>Çıkış Yap</label>
        <label style={styles.message}>
          Oturumu kapatmak istediğinize emin misiniz?
        </label>
        <flexboxLayout style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={onCancel}
          >
            İptal
          </button>
          <button
            style={{ ...styles.button, ...styles.confirmButton }}
            onClick={onConfirm}
          >
            Çıkış Yap
          </button>
        </flexboxLayout>
      </flexboxLayout>
    </absoluteLayout>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
  },
  modal: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    margin: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlignment: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    // 'flex' property’si tipik React Native’de var ama
    // NativeScript tarafında CSS olarak "flex-grow", "flex-shrink" vb. tanımlanır.
    margin: 8,
    padding: 12,
    borderRadius: 4,
    textAlignment: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
});
