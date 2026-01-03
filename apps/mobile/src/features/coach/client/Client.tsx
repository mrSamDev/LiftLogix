import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useClients } from "./hooks/useClients";

export function Client() {
  const { data: clients, isLoading, error } = useClients();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>FAILED TO LOAD CLIENTS</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ALL CLIENTS</Text>
        <View style={styles.clientList}>
          {clients?.map((client) => (
            <Pressable key={client.id} style={({ pressed }) => [styles.clientCard, pressed && styles.clientCardPressed]}>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{client.name}</Text>
                <Text style={styles.clientEmail}>{client.email}</Text>
              </View>
              <View style={[styles.statusBadge, client.isActive ? styles.statusActive : styles.statusInactive]}>
                <Text style={styles.statusText}>{client.isActive ? "ACTIVE" : "INACTIVE"}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF0000",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
  },
  header: {
    padding: 24,
    borderBottomWidth: 4,
    borderBottomColor: "#000000",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 16,
  },
  statCard: {
    width: "47%",
    aspectRatio: 1,
    padding: 20,
    borderWidth: 4,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  statCardPrimary: {
    backgroundColor: "#00FF00",
  },
  statCardSecondary: {
    backgroundColor: "#000000",
  },
  statCardAccent: {
    backgroundColor: "#FFFF00",
  },
  statCardRevenue: {
    backgroundColor: "#FF00FF",
  },
  statNumber: {
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 52,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  section: {
    padding: 24,
    borderTopWidth: 4,
    borderTopColor: "#000000",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  clientList: {
    gap: 12,
  },
  clientCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
  },
  clientCardPressed: {
    backgroundColor: "#F0F0F0",
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  clientLastWorkout: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
    marginBottom: 2,
  },
  clientEmail: {
    fontSize: 12,
    fontWeight: "400",
    color: "#666666",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: "#000000",
  },
  statusActive: {
    backgroundColor: "#00FF00",
  },
  statusInactive: {
    backgroundColor: "#FFFFFF",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
  actionSection: {
    padding: 24,
    gap: 12,
    borderTopWidth: 4,
    borderTopColor: "#000000",
  },
  actionButton: {
    padding: 20,
    backgroundColor: "#000000",
    borderWidth: 4,
    borderColor: "#000000",
    alignItems: "center",
  },
  actionButtonSecondary: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#000000",
    alignItems: "center",
  },
  actionButtonPressed: {
    transform: [{ translateY: 2 }],
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  actionButtonTextSecondary: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
});
