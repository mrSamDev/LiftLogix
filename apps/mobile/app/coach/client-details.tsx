import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";

interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "assigned" | "completed" | "in_progress";
}

const MOCK_CLIENT = {
  id: "1",
  name: "Mike Thompson",
  email: "mike.t@example.com",
  image: null,
  metrics: {
    weight: 82,
    height: 180,
    bodyFat: 15,
  },
  workoutPlans: [
    {
      id: "1",
      title: "Full Body Workout",
      description: "Compound movements for overall strength",
      date: "5/1/2026",
      status: "assigned" as const,
    },
    {
      id: "2",
      title: "HIIT Cardio",
      description: "High intensity interval training",
      date: "3/1/2026",
      status: "assigned" as const,
    },
  ],
};

export default function ClientDetails() {
  const params = useLocalSearchParams();
  const clientId = params.id as string;

  const client = MOCK_CLIENT;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {client.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.clientName}>{client.name}</Text>
        <Text style={styles.clientEmail}>{client.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, styles.metricCardMint]}>
            <Text style={styles.metricValue}>{client.metrics.weight}</Text>
            <Text style={styles.metricLabel}>kg</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardMint]}>
            <Text style={styles.metricValue}>{client.metrics.height}</Text>
            <Text style={styles.metricLabel}>cm</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardMint]}>
            <Text style={styles.metricValue}>{client.metrics.bodyFat}</Text>
            <Text style={styles.metricLabel}>% BF</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Workouts</Text>
          <Pressable
            style={({ pressed }) => [styles.createButton, pressed && styles.buttonPressed]}
            onPress={() => {
              router.push({
                pathname: "/coach/create-plan",
                params: { clientId: clientId },
              });
            }}
          >
            <Text style={styles.createButtonText}>Create Plan</Text>
          </Pressable>
        </View>

        <View style={styles.workoutList}>
          {client.workoutPlans.map((workout) => (
            <View key={workout.id} style={styles.workoutCard}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Assigned</Text>
                </View>
              </View>
              <Text style={styles.workoutDescription}>{workout.description}</Text>
              <Text style={styles.workoutDate}>{workout.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  backButton: {
    padding: 24,
    paddingBottom: 12,
  },
  backText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00D9C0",
  },
  profileCard: {
    marginHorizontal: 24,
    padding: 32,
    borderWidth: 4,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
    borderWidth: 4,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#000000",
  },
  clientName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  clientEmail: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666666",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -0.5,
  },
  metricsGrid: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  metricCard: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 4,
    borderColor: "#000000",
    alignItems: "center",
  },
  metricCardMint: {
    backgroundColor: "#D5F5F0",
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    lineHeight: 36,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    marginTop: 4,
  },
  createButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#00D9C0",
    borderWidth: 3,
    borderColor: "#000000",
  },
  buttonPressed: {
    transform: [{ translateY: 2 }],
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
  workoutList: {
    gap: 16,
  },
  workoutCard: {
    padding: 20,
    borderWidth: 4,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  workoutTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#C8F5C8",
    borderWidth: 2,
    borderColor: "#000000",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
  workoutDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666666",
    marginBottom: 8,
  },
  workoutDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "#999999",
  },
});
