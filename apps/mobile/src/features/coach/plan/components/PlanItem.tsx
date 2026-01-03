import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import type { Plan } from "@lift-logic/types";

interface PlanItemProps {
  plan: Plan;
  onEdit?: (planId: string) => void;
  onDelete?: (planId: string) => void;
  onUnassign?: (planId: string) => void;
}

function formatPlanDate(date: Date | string | undefined): string {
  if (!date) return "No date set";

  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PlanItem({ plan, onEdit, onDelete, onUnassign }: PlanItemProps) {
  const renderLeftActions = () => (
    <View style={styles.leftActionsContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          styles.editButton,
          pressed && styles.actionButtonPressed,
        ]}
        onPress={() => onEdit?.(plan.id)}
      >
        <Text style={styles.actionText}>EDIT</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          styles.deleteButton,
          pressed && styles.actionButtonPressed,
        ]}
        onPress={() => onDelete?.(plan.id)}
      >
        <Text style={styles.actionText}>DELETE</Text>
      </Pressable>
    </View>
  );

  const renderRightActions = () => (
    <View style={styles.rightActionsContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          styles.unassignButton,
          pressed && styles.actionButtonPressed,
        ]}
        onPress={() => onUnassign?.(plan.id)}
      >
        <Text style={styles.actionText}>UNASSIGN</Text>
      </Pressable>
    </View>
  );

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      friction={2}
      overshootLeft={false}
      overshootRight={false}
      leftThreshold={30}
      rightThreshold={30}
    >
      <View style={styles.workoutCard}>
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutTitle}>{plan.title}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>ASSIGNED</Text>
          </View>
        </View>
        {plan.description && (
          <Text style={styles.workoutDescription}>{plan.description}</Text>
        )}
        <Text style={styles.workoutDate}>{formatPlanDate(plan.scheduledDate)}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
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
    letterSpacing: -0.5,
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
    lineHeight: 20,
  },
  workoutDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "#999999",
  },
  leftActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: "100%",
    borderWidth: 4,
    borderColor: "#000000",
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  editButton: {
    backgroundColor: "#FFD700",
  },
  deleteButton: {
    backgroundColor: "#FF4444",
  },
  unassignButton: {
    backgroundColor: "#00D9C0",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
});
