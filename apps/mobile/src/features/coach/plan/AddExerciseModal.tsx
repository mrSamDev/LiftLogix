import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useForm } from "@tanstack/react-form";
import { Input } from "../../../components/Input";
import { Dropdown } from "../../../components/Dropdown";
import { useExercises } from "./hooks/useExercises";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime?: number;
  notes?: string;
}

interface AddExerciseModalProps {
  onAdd: (exercise: Exercise) => void;
  onCancel: () => void;
}

interface ExerciseFormData {
  exerciseId: string;
  sets: string;
  reps: string;
  weight: string;
  restTime: string;
  notes: string;
}

function parseExerciseForm(value: ExerciseFormData, exerciseName: string): Exercise {
  return {
    id: Date.now().toString(),
    name: exerciseName,
    sets: parseInt(value.sets) || 0,
    reps: parseInt(value.reps) || 0,
    weight: value.weight ? parseInt(value.weight) : undefined,
    restTime: value.restTime ? parseInt(value.restTime) : undefined,
    notes: value.notes || undefined,
  };
}

export function AddExerciseModal({ onAdd, onCancel }: AddExerciseModalProps) {
  const { data: exercises = [], isLoading } = useExercises();

  const exerciseForm = useForm({
    defaultValues: {
      exerciseId: "",
      sets: "10",
      reps: "10",
      weight: "10",
      restTime: "10",
      notes: "Demo notes",
    },
    onSubmit: async ({ value }) => {
      const selectedExercise = exercises.find((ex) => ex.id === value.exerciseId);
      if (!selectedExercise) return;

      const exercise = parseExerciseForm(value, selectedExercise.title);
      onAdd(exercise);
    },
  });

  const exerciseOptions = exercises.map((ex) => ({
    label: ex.title,
    value: ex.id,
  }));

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modal}>
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Exercise</Text>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00D9C0" />
              <Text style={styles.loadingText}>Loading exercises...</Text>
            </View>
          ) : (
            <>
              <exerciseForm.Field name="exerciseId">
                {(field) => <Dropdown label="Exercise" placeholder="Select an exercise" value={field.state.value} options={exerciseOptions} onChange={field.handleChange} />}
              </exerciseForm.Field>

              <exerciseForm.Field name="sets">
                {(field) => <Input label="Sets" placeholder="0" value={field.state.value} onChangeText={field.handleChange} onBlur={field.handleBlur} keyboardType="numeric" />}
              </exerciseForm.Field>

              <exerciseForm.Field name="reps">
                {(field) => <Input label="Reps" placeholder="0" value={field.state.value} onChangeText={field.handleChange} onBlur={field.handleBlur} keyboardType="numeric" />}
              </exerciseForm.Field>

              <exerciseForm.Field name="weight">
                {(field) => <Input label="Weight (kg)" placeholder="Optional" value={field.state.value} onChangeText={field.handleChange} onBlur={field.handleBlur} keyboardType="numeric" />}
              </exerciseForm.Field>

              <exerciseForm.Field name="restTime">
                {(field) => <Input label="Rest Time (seconds)" placeholder="Optional" value={field.state.value} onChangeText={field.handleChange} onBlur={field.handleBlur} keyboardType="numeric" />}
              </exerciseForm.Field>

              <exerciseForm.Field name="notes">
                {(field) => <Input label="Notes" placeholder="Optional notes" value={field.state.value} onChangeText={field.handleChange} onBlur={field.handleBlur} multiline numberOfLines={2} />}
              </exerciseForm.Field>
            </>
          )}
        </ScrollView>

        <View style={styles.modalFooter}>
          <Pressable style={({ pressed }) => [styles.cancelButton, pressed && styles.buttonPressed]} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.addButton, pressed && styles.buttonPressed]} onPress={() => exerciseForm.handleSubmit()}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#000000",
    maxHeight: "93%",
  },
  modalContent: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  loadingContainer: {
    paddingVertical: 48,
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666666",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 24,
    paddingTop: 0,
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  addButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: "#00D9C0",
    borderWidth: 3,
    borderColor: "#000000",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  buttonPressed: {
    transform: [{ translateY: 2 }],
  },
});
