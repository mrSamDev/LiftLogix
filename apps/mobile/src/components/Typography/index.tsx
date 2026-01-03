import { Text, StyleSheet, TextStyle } from "react-native";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "body" | "bodySmall" | "caption";
  color?: string;
  style?: TextStyle;
  children: React.ReactNode;
}

export function Typography({ variant = "body", color = "#000", style, children }: TypographyProps) {
  const variantStyle = styles[variant];

  return <Text style={[variantStyle, { color }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 24,
    fontWeight: "600",
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
  },
  h5: {
    fontSize: 18,
    fontWeight: "600",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400",
  },
  caption: {
    fontSize: 12,
    fontWeight: "500",
  },
});
