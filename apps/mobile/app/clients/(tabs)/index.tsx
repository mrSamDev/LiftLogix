import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useHomeData } from "@/apps/mobile/src/features/client/hooks/useHomeData";

export default function HomePage() {
  const { data, isLoading, error } = useHomeData();
  console.log("data: ", data);

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
        <Text style={styles.errorText}>Failed to load home data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>WELCOME</Text>
        <Text style={styles.userName}>{data?.user.name}</Text>
      </View>

      {data?.organization && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR GYM</Text>
          <View style={styles.gymCard}>
            <Text style={styles.gymName}>{data.organization.title}</Text>
            <View style={styles.locationBadge}>
              <Text style={styles.locationText}>
                {data.organization.location.latitude.toFixed(4)}, {data.organization.location.longitude.toFixed(4)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {data?.coach && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR COACH</Text>
          <View style={styles.coachCard}>
            <View style={styles.coachAvatar}>
              <Text style={styles.coachInitial}>{data.coach.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{data.coach.name}</Text>
              <Text style={styles.coachLabel}>ASSIGNED COACH</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>QUICK STATS</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>WORKOUTS</Text>
          </View>
          <View style={[styles.statCard, styles.statCardAccent]}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>DAYS ACTIVE</Text>
          </View>
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
    fontSize: 16,
    fontWeight: "700",
    color: "#FF0000",
  },
  header: {
    padding: 24,
    borderBottomWidth: 4,
    borderBottomColor: "#000000",
    backgroundColor: "#00FF00",
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 1,
  },
  userName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    lineHeight: 36,
    letterSpacing: -0.5,
    marginTop: 4,
  },
  section: {
    padding: 24,
    borderBottomWidth: 4,
    borderBottomColor: "#000000",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
    letterSpacing: 1,
  },
  gymCard: {
    padding: 20,
    borderWidth: 4,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
  },
  gymName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 12,
  },
  locationBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#FFFF00",
  },
  locationText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
  coachCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderWidth: 4,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    gap: 16,
  },
  coachAvatar: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: "#000000",
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  coachInitial: {
    fontSize: 32,
    fontWeight: "700",
    color: "#00FF00",
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  coachLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  statCard: {
    flex: 1,
    aspectRatio: 1,
    padding: 20,
    borderWidth: 4,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  statCardPrimary: {
    backgroundColor: "#FF00FF",
  },
  statCardAccent: {
    backgroundColor: "#00FFFF",
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
});
