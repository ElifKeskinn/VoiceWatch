import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { APP_COLORS } from "../../utils/constants";

interface ButtonProps {
  text: string;
  onTap: () => void;
  variant?: "primary" | "success" | "danger" | "warning";
  style?: any;
}

export function Button({ text, onTap, variant = "primary", style = {} }: ButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case "success":
        return styles.success;
      case "danger":
        return styles.danger;
      case "warning":
        return styles.warning;
      default:
        return styles.primary;
    }
  };

  return (
    <button 
      style={[styles.button, getVariantStyle(), style]}
      onTap={onTap}
    >
      {text}
    </button>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    padding: 12,
    borderRadius: 4,
    textAlignment: "center",
  },
  primary: {
    backgroundColor: APP_COLORS.primary,
    color: "white",
  },
  success: {
    backgroundColor: APP_COLORS.success,
    color: "white",
  },
  danger: {
    backgroundColor: APP_COLORS.danger,
    color: "white",
  },
  warning: {
    backgroundColor: APP_COLORS.warning,
    color: "black",
  },
});