import * as React from "react";
import { FlexboxLayout, Label, ScrollView, StyleSheet, Switch, TextField } from "react-nativescript";
import { Button } from "../common/CustomButton";

export function SignUpScreen({ navigation }: any) {
  const [formData, setFormData] = React.useState({
    name: "",
    surname: "",
    tcNo: "",
    age: "",
    password: "",
    bloodType: "",
    emergencyContacts: [""],
    privacyAccepted: false,
  });

  const handleSignUp = () => {
    console.log("Sign up data:", formData);
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <FlexboxLayout style={styles.form}>
        <TextField
          hint="İsim"
          style={styles.input}
          onTextChange={(args) => setFormData({ ...formData, name: args.value })}
        />
        <TextField
          hint="Soyisim"
          style={styles.input}
          onTextChange={(args) =>
            setFormData({ ...formData, surname: args.value })
          }
        />
        <TextField
          hint="TC Kimlik Numarası"
          style={styles.input}
          keyboardType="number"
          maxLength={11}
          onTextChange={(args) =>
            setFormData({ ...formData, tcNo: args.value })
          }
        />
        <TextField
          hint="Yaş"
          style={styles.input}
          keyboardType="number"
          onTextChange={(args) => setFormData({ ...formData, age: args.value })}
        />
        <TextField
          hint="Parola"
          style={styles.input}
          secure={true}
          onTextChange={(args) =>
            setFormData({ ...formData, password: args.value })
          }
        />
        <TextField
          hint="Kan Grubu"
          style={styles.input}
          onTextChange={(args) =>
            setFormData({ ...formData, bloodType: args.value })
          }
        />

        <FlexboxLayout style={styles.switchContainer}>
          <Label style={styles.switchLabel}>
            Gizlilik Sözleşmesini Kabul Ediyorum
          </Label>
          <Switch
            checked={formData.privacyAccepted}
            onCheckedChange={(args) =>
              setFormData({ ...formData, privacyAccepted: args.value })
            }
          />
        </FlexboxLayout>

        <Button
          style={styles.button}
          onTap={handleSignUp}
          text="Kayıt Ol"
          variant="primary"
        />
      </FlexboxLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  form: {
    padding: 20,
    flexDirection: "column",
  },
  input: {
    fontSize: 16,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  switchLabel: {
    flex: 1,
    fontSize: 14,
  },
  button: {
    fontSize: 18,
    backgroundColor: "#65adf1",
    color: "white",
    padding: 12,
    borderRadius: 4,
    textAlignment: "center",
  },
});
