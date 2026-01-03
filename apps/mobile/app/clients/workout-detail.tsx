import { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Alert, TextInput } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { useWorkouts } from "@/apps/mobile/src/features/client/hooks/useWorkouts";
import type { PlanExercise } from "@lift-logic/types";

interface ExerciseSet {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

interface ExerciseWithSets extends PlanExercise {
  currentSets: ExerciseSet[];
}

export default function WorkoutDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: workouts } = useWorkouts();

  const workout = workouts?.find((w) => w.id === id);

  const [exercises, setExercises] = useState<ExerciseWithSets[]>(() => {
    if (!workout) return [];
    return workout.exercises.map((ex) => ({
      ...ex,
      currentSets: Array.from({ length: ex.sets }, (_, i) => ({
        setNumber: i + 1,
        reps: ex.reps,
        weight: ex.weight,
        completed: false,
      })),
    }));
  });

  if (!workout) {
    return null;
  }

  function addSet(exerciseId: string) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const lastSet = ex.currentSets[ex.currentSets.length - 1];
        return {
          ...ex,
          currentSets: [
            ...ex.currentSets,
            {
              setNumber: ex.currentSets.length + 1,
              reps: lastSet.reps,
              weight: lastSet.weight,
              completed: false,
            },
          ],
        };
      })
    );
  }

  function removeSet(exerciseId: string, setNumber: number) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const newSets = ex.currentSets.filter((s) => s.setNumber !== setNumber);
        return {
          ...ex,
          currentSets: newSets.map((s, i) => ({ ...s, setNumber: i + 1 })),
        };
      })
    );
  }

  function toggleSetCompleted(exerciseId: string, setNumber: number) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          currentSets: ex.currentSets.map((s) => (s.setNumber === setNumber ? { ...s, completed: !s.completed } : s)),
        };
      })
    );
  }

  function updateWeight(exerciseId: string, setNumber: number, weight: number) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          currentSets: ex.currentSets.map((s) => (s.setNumber === setNumber ? { ...s, weight } : s)),
        };
      })
    );
  }

  function completeWorkout() {
    const totalSets = exercises.reduce((sum, ex) => sum + ex.currentSets.length, 0);
    const completedSets = exercises.reduce((sum, ex) => sum + ex.currentSets.filter((s) => s.completed).length, 0);

    if (completedSets < totalSets) {
      Alert.alert("Incomplete Workout", `You've completed ${completedSets} of ${totalSets} sets. Complete anyway?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete",
          onPress: () => {
            Alert.alert("Success", "Workout completed!");
            router.back();
          },
        },
      ]);
    } else {
      Alert.alert("Success", "Workout completed!");
      router.back();
    }
  }

  const totalSets = exercises.reduce((sum, ex) => sum + ex.currentSets.length, 0);
  const completedSets = exercises.reduce((sum, ex) => sum + ex.currentSets.filter((s) => s.completed).length, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{workout.title}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {exercises.map((exercise) => (
          <ExerciseBlock
            key={exercise.id}
            exercise={exercise}
            onAddSet={addSet}
            onRemoveSet={removeSet}
            onToggleSet={toggleSetCompleted}
            onUpdateWeight={updateWeight}
          />
        ))}
      </ScrollView>

      <Pressable style={styles.completeButton} onPress={completeWorkout}>
        <Text style={styles.completeButtonText}>
          COMPLETE WORKOUT ({completedSets}/{totalSets})
        </Text>
      </Pressable>
    </View>
  );
}

function ExerciseBlock({
  exercise,
  onAddSet,
  onRemoveSet,
  onToggleSet,
  onUpdateWeight,
}: {
  exercise: ExerciseWithSets;
  onAddSet: (exerciseId: string) => void;
  onRemoveSet: (exerciseId: string, setNumber: number) => void;
  onToggleSet: (exerciseId: string, setNumber: number) => void;
  onUpdateWeight: (exerciseId: string, setNumber: number, weight: number) => void;
}) {
  const completedCount = exercise.currentSets.filter((s) => s.completed).length;

  return (
    <View style={styles.exerciseBlock}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.progress}>
          {completedCount}/{exercise.currentSets.length}
        </Text>
      </View>

      <Text style={styles.exerciseMeta}>
        {exercise.reps} reps {exercise.weight} kg
      </Text>

      <View style={styles.setsContainer}>
        {exercise.currentSets.map((set) => (
          <SetRow
            key={set.setNumber}
            set={set}
            onRemove={() => onRemoveSet(exercise.id, set.setNumber)}
            onToggle={() => onToggleSet(exercise.id, set.setNumber)}
            onUpdateWeight={(weight) => onUpdateWeight(exercise.id, set.setNumber, weight)}
          />
        ))}

        <Pressable style={styles.addSetButton} onPress={() => onAddSet(exercise.id)}>
          <Text style={styles.addSetText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SetRow({
  set,
  onRemove,
  onToggle,
  onUpdateWeight,
}: {
  set: ExerciseSet;
  onRemove: () => void;
  onToggle: () => void;
  onUpdateWeight: (weight: number) => void;
}) {
  function handleWeightChange(text: string) {
    const weight = parseInt(text) || 0;
    onUpdateWeight(weight);
  }

  return (
    <Pressable style={[styles.setRow, set.completed && styles.setRowCompleted]} onPress={onToggle}>
      <Text style={[styles.setInfo, set.completed && styles.setInfoCompleted]}>{set.reps} × </Text>
      <TextInput
        style={[styles.weightInput, set.completed && styles.weightInputCompleted]}
        value={set.weight.toString()}
        onChangeText={handleWeightChange}
        keyboardType="numeric"
        selectTextOnFocus
      />
      <Text style={[styles.setInfo, set.completed && styles.setInfoCompleted]}> kg</Text>
      <Pressable style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeText}>×</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: "#000",
  },
  backButton: {
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: "#00d4aa",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  exerciseBlock: {
    borderWidth: 3,
    borderColor: "#000",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    flex: 1,
  },
  progress: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  exerciseMeta: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  setsContainer: {
    gap: 6,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  setRowCompleted: {
    backgroundColor: "#00d4aa",
  },
  setInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  setInfoCompleted: {
    textDecorationLine: "line-through",
    color: "#000",
  },
  weightInput: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 60,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: 8,
  },
  weightInputCompleted: {
    textDecorationLine: "line-through",
    backgroundColor: "#00d4aa",
  },
  removeButton: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  removeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    lineHeight: 18,
  },
  addSetButton: {
    borderWidth: 2,
    borderColor: "#00d4aa",
    borderStyle: "dashed",
    padding: 12,
    alignItems: "center",
  },
  addSetText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#00d4aa",
  },
  completeButton: {
    backgroundColor: "#00d4aa",
    borderTopWidth: 3,
    borderColor: "#000",
    padding: 20,
    alignItems: "center",
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
