import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { TextField, Switch } from "@nativescript/core";

export function SignUpScreen({ navigation }) {
  const [formData, setFormData] = React.useState({
    name: "",
    surname: "",
    tcNo: "",
    age: "",
    password: "",
    bloodType: "",
    emergencyContacts: [""],
    privacyAccepted: false
  });

  const handleSignUp = () => {
    console.log("Sign up data:", formData);
    navigation.navigate("Home");
  };

  return (
    <scrollView style={styles.container}>
      <flexboxLayout style={styles.form}>
        <textField 
          hint="İsim" 
          style={styles.input}
          onTextChange={(args) => setFormData({...formData, name: args.value})}
        />
        <textField 
          hint="Soyisim" 
          style={styles.input}
          onTextChange={(args) => setFormData({...formData, surname: args.value})}
        />
        <textField 
          hint="TC Kimlik Numarası" 
          style={styles.input}
          keyboardType="number"
          maxLength={11}
          onTextChange={(args) => setFormData({...formData, tcNo: args.value})}
        />
        <textField 
          hint="Yaş" 
          style={styles.input}
          keyboardType="number"
          onTextChange={(args) => setFormData({...formData, age: args.value})}
        />
        <textField 
          hint="Parola" 
          style={styles.input}
          secure={true}
          onTextChange={(args) => setFormData({...formData, password: args.value})}
        />
        <textField 
          hint="Kan Grubu" 
          style={styles.input}
          onTextChange={(args) => setFormData({...formData, bloodType: args.value})}
        />
        
        <flexboxLayout style={styles.switchContainer}>
          <label style={styles.switchLabel}>Gizlilik Sözleşmesini Kabul Ediyorum</label>
          <switch 
            checked={formData.privacyAccepted}
            onCheckedChange={(args) => setFormData({...formData, privacyAccepted: args.value})}
          />
        </flexboxLayout>

        <button 
          style={styles.button}
          onTap={handleSignUp}
        >
          Kayıt Ol
        </button>
      </flexboxLayout>
    </scrollView>
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