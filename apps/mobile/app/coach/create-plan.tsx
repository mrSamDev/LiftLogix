import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

import { Input } from "../../src/components/Input";
import { Switch } from "../../src/components/Switch";
import { AddExerciseModal, Exercise } from "../../src/features/coach/plan/AddExerciseModal";
import { useCreatePlan } from "../../src/features/coach/plan/hooks/useCreatePlan";

function addExerciseToList(exercise: Exercise, exercises: Exercise[], setExercises: (exercises: Exercise[]) => void) {
  setExercises([...exercises, exercise]);
}

export default function CreatePlan() {
  const params = useLocalSearchParams();
  const clientId = params.clientId as string;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showAddExercise, setShowAddExercise] = useState(false);

  const { mutate: createPlan, isPending } = useCreatePlan();

  const form = useForm({
    defaultValues: {
      title: "Upper Body Strength",
      description: "Upper body workout focusing on strength building",
      scheduledDate: "2026-07-01",
      planNotes: "Plan to be followed for 8 weeks",
      isPublic: false,
    },
    onSubmit: async ({ value }) => {
      if (exercises.length === 0) {
        Alert.alert("No Exercises", "Please add at least one exercise to the plan");
        return;
      }

      const planData = {
        clientId,
        title: value.title,
        description: value.description,
        exercises: exercises.map((ex) => ({
          id: ex.id,
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight || 0,
          restTime: ex.restTime || 0,
          notes: ex.notes,
        })),
        isPublic: value.isPublic,
        planNotes: value.planNotes,
        scheduledDate: value.scheduledDate,
      };

      console.log("planData: ", planData);

      createPlan(planData, {
        onSuccess: () => {
          Alert.alert("Success", "Plan created successfully");
          router.back();
        },
        onError: (error) => {
          Alert.alert("Error", error.message || "Failed to create plan");
        },
      });
    },
  });

  function handleAddExercise(exercise: Exercise) {
    addExerciseToList(exercise, exercises, setExercises);
    setShowAddExercise(false);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <Text style={styles.title}>Create Exercise Plan</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Basic Details</Text>
            <Pressable style={({ pressed }) => [styles.addButton, pressed && styles.buttonPressed]} onPress={() => setShowAddExercise(true)}>
              <Text style={styles.addButtonText}>Add Exercise</Text>
            </Pressable>
          </View>

          <form.Field name="title">
            {(field) => <Input label="Plan Title" placeholder="e.g., Upper Body Strength" value={field.state.value} onChangeText={field.handleChange} onBlur={field.handleBlur} />}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <Input
                label="Description"
                placeholder="Describe the workout plan goals and focus"
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                multiline
                numberOfLines={3}
              />
            )}
          </form.Field>

          <form.Field name="scheduledDate">
            {(field) => <Input label="Scheduled Date" placeholder="YYYY-MM-DD" value={field.state.value} onChangeText={field.handleChange} onBlur={field.handleBlur} />}
          </form.Field>

          <form.Field name="planNotes">
            {(field) => (
              <Input
                label="Plan Notes"
                placeholder="Optional notes for the entire plan"
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                multiline
                numberOfLines={3}
              />
            )}
          </form.Field>

          <form.Field name="isPublic">{(field) => <Switch label="Public Plan" value={field.state.value} onValueChange={field.handleChange} />}</form.Field>
        </View>

        {exercises.length > 0 && (
          <View style={styles.exerciseList}>
            <Text style={styles.sectionTitle}>Exercises ({exercises.length})</Text>
            {exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetail}>
                  {exercise.sets} sets × {exercise.reps} reps
                  {exercise.weight && ` @ ${exercise.weight}kg`}
                </Text>
                {exercise.notes && <Text style={styles.exerciseNotes}>{exercise.notes}</Text>}
              </View>
            ))}
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={({ pressed }) => [styles.cancelButton, pressed && styles.buttonPressed]} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.createButton, pressed && styles.buttonPressed, isPending && styles.buttonDisabled]} onPress={() => form.handleSubmit()} disabled={isPending}>
          <Text style={styles.createButtonText}>{isPending ? "Creating..." : "Create Plan"}</Text>
        </Pressable>
      </View>

      {showAddExercise && <AddExerciseModal onAdd={handleAddExercise} onCancel={() => setShowAddExercise(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00D9C0",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -1,
  },
  card: {
    marginHorizontal: 24,
    padding: 24,
    borderWidth: 4,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#00D9C0",
    borderWidth: 3,
    borderColor: "#000000",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  buttonPressed: {
    transform: [{ translateY: 2 }],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  exerciseList: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
  },
  exerciseCard: {
    padding: 16,
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#F5F5F5",
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  exerciseDetail: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666666",
  },
  exerciseNotes: {
    fontSize: 12,
    fontWeight: "400",
    color: "#999999",
    marginTop: 4,
  },
  spacer: {
    height: 100,
  },
  footer: {
    flexDirection: "row",
    padding: 24,
    paddingTop: 16,
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 4,
    borderTopColor: "#000000",
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
  createButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: "#00D9C0",
    borderWidth: 3,
    borderColor: "#000000",
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
});
