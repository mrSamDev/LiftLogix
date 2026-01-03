import { View, Image, StyleSheet, ViewStyle } from "react-native";
import { Typography } from "../Typography";

interface AvatarProps {
  uri?: string | null;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  style?: ViewStyle;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const fontSizeMap = {
  sm: 14,
  md: 18,
  lg: 24,
  xl: 36,
};

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ uri, name, size = "md", style }: AvatarProps) {
  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.avatar, { width: dimension, height: dimension, borderRadius: dimension / 2 }, style]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatar,
        styles.placeholder,
        { width: dimension, height: dimension, borderRadius: dimension / 2 },
        style,
      ]}
    >
      <Typography variant="body" color="#fff" style={{ fontSize }}>
        {getInitials(name)}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    backgroundColor: "#1E90FF",
  },
});
