import { View, Text, StyleSheet, Pressable, Modal, ScrollView, ViewStyle } from "react-native";
import { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
}

export function Select({ label, value, options, onChange, placeholder, error, style }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <View style={[styles.formGroup, style]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={[styles.select, error && styles.selectError]} onPress={() => setIsOpen(true)}>
        <Text style={[styles.selectText, !selectedOption && styles.placeholder]}>{selectedOption ? selectedOption.label : placeholder || "Select..."}</Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{label}</Text>
            <ScrollView style={styles.optionsList}>
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
        </Pressable>
      </Modal>
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
  select: {
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectError: {
    borderColor: "#FF0000",
  },
  selectText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  placeholder: {
    color: "#CCCCCC",
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF0000",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#000000",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: "#000000",
  },
  optionsList: {
    maxHeight: 400,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: "#F0F0F0",
  },
  optionSelected: {
    backgroundColor: "#00D9C0",
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
  },
});
