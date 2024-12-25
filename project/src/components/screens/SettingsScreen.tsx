import { Dialogs } from "@nativescript/core";
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Button } from "../common/CustomButton";

export function SettingsScreen() {
  const [sensitivity, setSensitivity] = React.useState(50);
  const mockContacts = [
    { name: "Ahmet Yılmaz", phone: "05551234567" },
    { name: "Ayşe Demir", phone: "05559876543" },
  ];

  const showAbout = () => {
    Dialogs.alert({
      title: "Hakkında & Destek",
      message: "VoiceWatch v1.0.0\nDestek için: support@voicewatch.com",
      okButtonText: "Tamam",
    });
  };

  return (
    <scrollView style={styles.container}>
      <stackLayout style={styles.section}>
        <label style={styles.sectionTitle}>Acil Durum Kontakları</label>
        {mockContacts.map((contact, index) => (
          <gridLayout key={index} style={styles.contactItem} columns="*, auto, auto">
            <label col={0} style={styles.contactInfo}>
              {contact.name}
              {"\n"}
              {contact.phone}
            </label>
            <button col={1} style={styles.iconButton}>
              ✏️
            </button>
            <button col={2} style={styles.iconButton}>
              ❌
            </button>
          </gridLayout>
        ))}
        <button style={styles.addButton}>+ Yeni Kontak Ekle</button>
      </stackLayout>

      <stackLayout style={styles.section}>
        <label style={styles.sectionTitle}>Hassasiyet Ayarı</label>
        <slider
          value={sensitivity}
          minValue={0}
          maxValue={100}
          onValueChange={(args) => setSensitivity(args.value)}
        />
        <label style={styles.sensitivityLabel}>{Math.round(sensitivity)}%</label>
      </stackLayout>

      <Button style={styles.aboutButton} onTap={showAbout} text="Hakkında & Destek" />
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  contactItem: {
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 14,
  },
  iconButton: {
    fontSize: 16,
    width: 40,
    height: 40,
    margin: 4,
    textAlignment: "center",
  },
  addButton: {
    marginTop: 12,
    fontSize: 16,
    backgroundColor: "#65adf1",
    color: "white",
    padding: 8,
    borderRadius: 4,
    textAlignment: "center",
  },
  sensitivityLabel: {
    textAlignment: "center",
    marginTop: 8,
  },
  aboutButton: {
    margin: 16,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 4,
    textAlignment: "center",
  },
});
