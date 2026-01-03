import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: TextInputProps["keyboardType"];
  error?: string;
  style?: ViewStyle;
}

export function Input({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  multiline = false,
  numberOfLines,
  keyboardType,
  error,
  style,
}: InputProps) {
  return (
    <View style={[styles.formGroup, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#CCCCCC"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF0000",
    marginTop: 4,
  },
});
