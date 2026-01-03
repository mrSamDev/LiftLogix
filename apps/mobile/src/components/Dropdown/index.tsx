import { View, Text, StyleSheet, Pressable, ScrollView, ViewStyle } from "react-native";
import { useState } from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
}

export function Dropdown({ label, value, options, onChange, placeholder, error, style }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <View style={[styles.formGroup, style]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={[styles.select, error && styles.selectError]} onPress={() => setIsOpen(!isOpen)}>
        <Text style={[styles.selectText, !selectedOption && styles.placeholder]}>{selectedOption ? selectedOption.label : placeholder || "Select..."}</Text>
        <Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {isOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.optionsList} nestedScrollEnabled>
            {options.map((option) => (
              <Pressable
                key={option.value}
                style={({ pressed }) => [styles.option, option.value === value && styles.optionSelected, pressed && styles.optionPressed]}
                onPress={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <Text style={[styles.optionText, option.value === value && styles.optionTextSelected]}>{option.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 24,
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },
  select: {
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectError: {
    borderColor: "#FF0000",
  },
  selectText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    flex: 1,
  },
  placeholder: {
    color: "#CCCCCC",
  },
  arrow: {
    fontSize: 12,
    color: "#000000",
    marginLeft: 8,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF0000",
    marginTop: 4,
  },
  dropdown: {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#000000",
    maxHeight: 200,
    zIndex: 1001,
  },
  optionsList: {
    maxHeight: 200,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  optionSelected: {
    backgroundColor: "#E6F9F7",
  },
  optionPressed: {
    backgroundColor: "#F0F0F0",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  optionTextSelected: {
    fontWeight: "700",
    color: "#00D9C0",
  },
});
