import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { APP_COLORS } from "../../utils/constants";

export function SplashScreen({ navigation }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignIn');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <flexboxLayout style={styles.container}>
      <label style={styles.title}>VoiceWatch</label>
      <label style={styles.subtitle}>Güvenliğiniz için sizinle</label>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    opacity: 0.9,
  },
});