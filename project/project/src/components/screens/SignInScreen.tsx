import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { validateTCKN, validatePassword } from "../../utils/validation";
import { useNavigation } from "../../navigation/hooks/useNavigation";

export function SignInScreen() {
  const navigation = useNavigation();
  const [tcNo, setTcNo] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignIn = () => {
    if (validateTCKN(tcNo) && validatePassword(password)) {
      navigation.navigate("Home");
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <Input 
        hint="TC Kimlik Numarası"
        value={tcNo}
        onTextChange={setTcNo}
        keyboardType="number"
        maxLength={11}
      />
      <Input 
        hint="Parola"
        value={password}
        onTextChange={setPassword}
        secure={true}
      />
      <Button 
        text="Giriş Yap"
        onTap={handleSignIn}
      />
      <Button 
        text="Hesap Oluştur"
        onTap={() => navigation.navigate("SignUp")}
        variant="warning"
        style={styles.signUpButton}
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
  },
  signUpButton: {
    marginTop: 12,
  }
});