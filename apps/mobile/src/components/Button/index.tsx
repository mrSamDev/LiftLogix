import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, ViewStyle } from "react-native";

interface ButtonProps {
  onPress: () => void;
  text: string;
  variant?: "primary" | "outline" | "danger";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({ onPress, text, variant = "primary", disabled = false, loading = false, style }: ButtonProps) {
  const variantStyle = styles[variant];
  const textVariantStyle = textStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, variantStyle, isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#1E90FF" : "#fff"} />
      ) : (
        <Text style={[styles.buttonText, textVariantStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  primary: {
    backgroundColor: "#1E90FF",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1E90FF",
  },
  danger: {
    backgroundColor: "#F44336",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: "#fff",
  },
  outline: {
    color: "#1E90FF",
  },
  danger: {
    color: "#fff",
  },
});
