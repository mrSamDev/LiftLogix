import { View, Text, Pressable, StyleSheet } from "react-native";

interface SwitchProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Switch({ label, value, onValueChange }: SwitchProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.track, value && styles.trackActive]}
        onPress={() => onValueChange(!value)}
      >
        <View style={[styles.thumb, value && styles.thumbActive]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  track: {
    width: 56,
    height: 32,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    padding: 2,
  },
  trackActive: {
    backgroundColor: "#00D9C0",
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: "#000000",
    alignSelf: "flex-start",
  },
  thumbActive: {
    alignSelf: "flex-end",
  },
});
