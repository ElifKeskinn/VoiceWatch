
import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function ProfileScreen() {
  const mockUser = {
    name: "Mehmet",
    surname: "Yılmaz",
    tcNo: "12345678901",
    age: "35",
    bloodType: "A Rh+",
    profileImage: "~/assets/default-avatar.png"
  };

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      console.log("Password changed successfully");
    } else {
      console.log("Passwords don't match");
    }
  };

  return (
    <scrollView style={styles.container}>
      <flexboxLayout style={styles.header}>
        <image src={mockUser.profileImage} style={styles.profileImage} />
        <label style={styles.name}>{mockUser.name} {mockUser.surname}</label>
      </flexboxLayout>

      <stackLayout style={styles.infoSection}>
        <label style={styles.infoLabel}>TC Kimlik No:</label>
        <label style={styles.infoValue}>{mockUser.tcNo}</label>

        <label style={styles.infoLabel}>Yaş:</label>
        <label style={styles.infoValue}>{mockUser.age}</label>

        <label style={styles.infoLabel}>Kan Grubu:</label>
        <label style={styles.infoValue}>{mockUser.bloodType}</label>
      </stackLayout>

      <stackLayout style={styles.passwordSection}>
        <label style={styles.sectionTitle}>Parola Değiştir</label>
        <textField
          hint="Yeni Parola"
          secure={true}
          style={styles.input}
          onTextChange={(args) => setNewPassword(args.value)}
        />
        <textField
          hint="Yeni Parola Tekrar"
          secure={true}
          style={styles.input}
          onTextChange={(args) => setConfirmPassword(args.value)}
        />
        <button
          style={styles.button}
          onTap={handlePasswordChange}
        >
          Parolayı Güncelle
        </button>
      </stackLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 16,
  },
  passwordSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    fontSize: 16,
    backgroundColor: "#65adf1",
    color: "white",
    padding: 12,
    borderRadius: 4,
    textAlignment: "center",
  },
});