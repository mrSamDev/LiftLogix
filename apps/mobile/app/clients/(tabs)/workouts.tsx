import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { router } from "expo-router";

import { useWorkouts } from "@/apps/mobile/src/features/client/hooks/useWorkouts";
import type { Plan } from "@lift-logic/types";

export default function WorkoutsPage() {
  const { data: workouts, error, isLoading } = useWorkouts();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>ERROR</Text>
          <Text style={styles.errorMessage}>{error.message}</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {workouts?.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </ScrollView>
  );
}

function WorkoutCard({ workout }: { workout: Plan }) {
  const exerciseCount = workout.exercises.length;
  const isScheduled = !!workout.scheduledDate;

  function handlePress() {
    router.push(`/clients/workout-detail?id=${workout.id}`);
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{workout.title}</Text>
        {isScheduled && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>SCHEDULED</Text>
          </View>
        )}
      </View>

      {workout.description && (
        <Text style={styles.description}>{workout.description}</Text>
      )}

      {workout.scheduledDate && (
        <Text style={styles.date}>
          {new Date(workout.scheduledDate).toLocaleDateString()}
        </Text>
      )}

      <View style={styles.divider} />

      <Text style={styles.exerciseCount}>
        {exerciseCount} exercise{exerciseCount !== 1 ? "s" : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#000",
    padding: 20,
    marginBottom: 16,
  },
  cardPressed: {
    backgroundColor: "#f0f0f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    flex: 1,
    lineHeight: 28,
  },
  statusBadge: {
    backgroundColor: "#00ff00",
    borderWidth: 2,
    borderColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    lineHeight: 22,
  },
  date: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    marginBottom: 12,
  },
  divider: {
    height: 2,
    backgroundColor: "#000",
    marginVertical: 12,
  },
  exerciseCount: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  errorBox: {
    borderWidth: 4,
    borderColor: "#ff0000",
    backgroundColor: "#fff",
    padding: 20,
    margin: 16,
  },
  errorText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ff0000",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: "#000",
  },
});
