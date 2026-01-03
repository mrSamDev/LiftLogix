import { View, StyleSheet, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "outlined";
  style?: ViewStyle;
}

export function Card({ children, variant = "default", style }: CardProps) {
  const variantStyle = variant === "outlined" ? styles.outlined : styles.default;

  return <View style={[styles.card, variantStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
  },
  default: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outlined: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
});
