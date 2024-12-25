import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { APP_COLORS } from "../../utils/constants";

interface InputProps {
  hint: string;
  value: string;
  onTextChange: (value: string) => void;
  secure?: boolean;
  keyboardType?: "text" | "number" | "email" | "phone";
  maxLength?: number;
  style?: any;
}

export function Input({ 
  hint, 
  value, 
  onTextChange, 
  secure = false, 
  keyboardType = "text",
  maxLength,
  style = {} 
}: InputProps) {
  return (
    <textField 
      hint={hint}
      text={value}
      secure={secure}
      keyboardType={keyboardType}
      maxLength={maxLength}
      style={[styles.input, style]}
      onTextChange={(args) => onTextChange(args.value)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: APP_COLORS.border,
    borderRadius: 4,
  },
});