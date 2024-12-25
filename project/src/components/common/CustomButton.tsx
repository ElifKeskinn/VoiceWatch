// src/components/common/CustomButton.tsx
import { Button, GestureEventData, StyleSheet } from "@nativescript/react";
import * as React from "react";
import { APP_COLORS } from "../../utils/constants";

interface CustomButtonProps {
  text: string;
  onTap: (args: GestureEventData) => void;
  variant?: "primary" | "success" | "danger" | "warning";
  style?: any;
}

export function CustomButton({
  text,
  onTap,
  variant = "primary",
  style = {},
}: CustomButtonProps) {
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
    <Button
      text={text}
      style={{ ...styles.button, ...getVariantStyle(), ...style }}
      onTap={onTap}
    />
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
