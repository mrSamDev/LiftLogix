import { View, StyleSheet, ScrollView, Switch } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { User } from "@lift-logic/types";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";
import { Avatar } from "../../components/Avatar";
import { Card } from "../../components/Card";

interface ProfileScreenProps {
  user: User;
  onLogout: () => Promise<void>;
  onDeactivate: () => Promise<void>;
  onUpdateUnitPreference: (preference: "gram") => Promise<void>;
  isLoading?: boolean;
}

export function ProfileScreen({
  user,
  onLogout,
  onDeactivate,
  onUpdateUnitPreference,
  isLoading = false,
}: ProfileScreenProps) {
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isUpdatingPreference, setIsUpdatingPreference] = useState(false);

  const handleDeactivate = async () => {
    setIsDeactivating(true);
    await onDeactivate();
    setIsDeactivating(false);
  };

  const handleUnitToggle = async () => {
    setIsUpdatingPreference(true);
    await onUpdateUnitPreference("gram");
    setIsUpdatingPreference(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Avatar uri={user.image} name={user.name} size="xl" />
        <Typography variant="h2" style={styles.name}>
          {user.name}
        </Typography>
        <Typography variant="body" color="#666" style={styles.email}>
          {user.email}
        </Typography>
        <View style={styles.roleBadge}>
          <Typography variant="caption" color="#1E90FF">
            {user.role}
          </Typography>
        </View>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.infoRow}>
            <Typography variant="body" color="#333">
              Organization ID
            </Typography>
            <Typography variant="body" color="#666">
              {user.orgId || "N/A"}
            </Typography>
          </View>
        </Card>

        <Card>
          <View style={styles.infoRow}>
            <Typography variant="body" color="#333">
              Account Status
            </Typography>
            <View style={[styles.statusBubble, user.isActive ? styles.activeBubble : styles.inactiveBubble]}>
              <Typography variant="caption" color="#fff">
                {user.isActive ? "Active" : "Inactive"}
              </Typography>
            </View>
          </View>
        </Card>

        <Card>
          <View style={styles.infoRow}>
            <Typography variant="body" color="#333">
              Unit Preference
            </Typography>
            <View style={styles.toggleContainer}>
              <Typography variant="caption" color="#666">
                {user.unitPreference}
              </Typography>
              <Switch
                value={user.unitPreference === "gram"}
                onValueChange={handleUnitToggle}
                disabled={isUpdatingPreference}
              />
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button
          onPress={handleDeactivate}
          text={isDeactivating ? "Deactivating..." : "Deactivate Profile"}
          variant="danger"
          disabled={isDeactivating || !user.isActive}
        />
        <Button
          onPress={onLogout}
          text={isLoading ? "Logging out..." : "Logout"}
          variant="outline"
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  name: {
    marginTop: 12,
  },
  email: {
    marginTop: 4,
  },
  roleBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#E3F2FD",
    borderRadius: 20,
  },
  section: {
    gap: 12,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBubble: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBubble: {
    backgroundColor: "#4CAF50",
  },
  inactiveBubble: {
    backgroundColor: "#F44336",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actions: {
    gap: 12,
  },
});
