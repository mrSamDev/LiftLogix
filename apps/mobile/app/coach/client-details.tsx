import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import type { Plan } from "@lift-logic/types";

import { useClients } from "../../src/features/coach/client/hooks/useClients";
import { useGetPlansByUser } from "../../src/features/coach/plan/hooks/useGetPlanUser";
import { useAuthState } from "../../src/store/authState";
import { PlanItem } from "../../src/features/coach/plan/components/PlanItem";
import { ConfirmModal } from "../../src/components/ConfirmModal";

interface Client {
  id: string;
  name: string;
  email: string;
}

function findClient(clients: Client[] | undefined, clientId: string) {
  return clients?.find((c) => c.id === clientId) || null;
}

type ConfirmAction = {
  type: "delete" | "unassign";
  planId: string;
  planTitle: string;
} | null;

export default function ClientDetails() {
  const params = useLocalSearchParams();
  const clientId = params.id as string;

  const { user } = useAuthState();
  const { data: clients } = useClients();
  const { data: plans, isLoading, isError } = useGetPlansByUser(clientId);

  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const client = findClient(clients, clientId);

  function handleEdit(planId: string) {
    console.log("Edit plan:", planId);
  }

  function handleDelete(planId: string) {
    const plan = plans?.find((p) => p.id === planId);
    if (!plan) return;

    setConfirmAction({
      type: "delete",
      planId,
      planTitle: plan.title,
    });
  }

  function handleUnassign(planId: string) {
    const plan = plans?.find((p) => p.id === planId);
    if (!plan) return;

    setConfirmAction({
      type: "unassign",
      planId,
      planTitle: plan.title,
    });
  }

  function confirmDelete() {
    if (!confirmAction || confirmAction.type !== "delete") return;

    console.log("Confirmed delete:", confirmAction.planId);
    setConfirmAction(null);
  }

  function confirmUnassign() {
    if (!confirmAction || confirmAction.type !== "unassign") return;

    console.log("Confirmed unassign:", confirmAction.planId);
    setConfirmAction(null);
  }

  function handleConfirm() {
    if (!confirmAction) return;

    if (confirmAction.type === "delete") {
      confirmDelete();
    } else {
      confirmUnassign();
    }
  }

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
                {client?.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.clientName}>{client?.name}</Text>
          <Text style={styles.clientEmail}>{client?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, styles.metricCardMint]}>
              <Text style={styles.metricValue}>{user?.metrics?.weight || 0}</Text>
              <Text style={styles.metricLabel}>kg</Text>
            </View>

            <View style={[styles.metricCard, styles.metricCardMint]}>
              <Text style={styles.metricValue}>{user?.metrics?.height || 0}</Text>
              <Text style={styles.metricLabel}>cm</Text>
            </View>

            <View style={[styles.metricCard, styles.metricCardMint]}>
              <Text style={styles.metricValue}>{user?.metrics?.bodyFat || 0}</Text>
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
            {isLoading && (
              <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#00D9C0" />
                <Text style={styles.stateText}>Loading plans...</Text>
              </View>
            )}

            {isError && (
              <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Failed to load plans</Text>
                <Text style={styles.stateSubtext}>Please try again later</Text>
              </View>
            )}

            {!isLoading && !isError && (!plans || plans.length === 0) && (
              <View style={styles.centerContainer}>
                <Text style={styles.emptyText}>No plans yet</Text>
                <Text style={styles.stateSubtext}>Create a plan to get started</Text>
              </View>
            )}

            {!isLoading && !isError && plans && Array.isArray(plans) && plans.length > 0 && (
              <>
                {plans.map((plan: Plan) => (
                  <PlanItem
                    key={plan.id}
                    plan={plan}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onUnassign={handleUnassign}
                  />
                ))}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={confirmAction !== null}
        title={
          confirmAction?.type === "delete"
            ? "Delete Plan"
            : "Unassign Plan"
        }
        message={
          confirmAction?.type === "delete"
            ? `Are you sure you want to delete "${confirmAction?.planTitle}"? This action cannot be undone.`
            : `Are you sure you want to unassign "${confirmAction?.planTitle}" from this client?`
        }
        confirmText={confirmAction?.type === "delete" ? "Delete" : "Unassign"}
        confirmStyle={confirmAction?.type === "delete" ? "danger" : "default"}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
      />
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
  centerContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  stateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF4444",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
    marginBottom: 8,
  },
  stateSubtext: {
    fontSize: 14,
    fontWeight: "400",
    color: "#999999",
  },
});
