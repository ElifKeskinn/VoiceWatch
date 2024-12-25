import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Button } from "../common/CustomButton";

export function HomeScreen() {
  const [isListening, setIsListening] = React.useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
    console.log(isListening ? "Dinleme durduruldu" : "Dinleme başlatıldı");
  };

  const sendAlert = () => {
    console.log("Bilinçli uyarı gönderildi");
  };

  return (
    <flexboxLayout style={styles.container}>
      <Button
        style={{
          ...styles.button,
          ...(isListening ? styles.stopButton : styles.startButton),
        }}
        onTap={toggleListening}
        text={isListening ? "Dinlemeyi Durdur" : "Dinlemeyi Başlat"}
        variant={isListening ? "danger" : "success"} // İsteğe bağlı varyant
      />

      <Button
        style={{ ...styles.button, ...styles.alertButton }}
        onTap={sendAlert}
        text="Bilinçli Uyarı Gönder"
        variant="warning" // İsteğe bağlı varyant
      />
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  button: {
    fontSize: 18,
    padding: 16,
    borderRadius: 8,
    textAlignment: "center",
  },
  startButton: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  stopButton: {
    backgroundColor: "#f44336",
    color: "white",
  },
  alertButton: {
    backgroundColor: "#FFC107",
    color: "black",
  },
});
