import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function RewardCard({ monedas, xp }) {
  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Text style={styles.emoji}>🍃</Text>
        <Text style={styles.value}>+{monedas}</Text>
        <Text style={styles.label}>Monedas</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <Text style={styles.emoji}>⚡</Text>
        <Text style={styles.value}>+{xp}</Text>
        <Text style={styles.label}>XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF8E8",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#F0D68A",
    paddingVertical: 16,
    width: "100%",
    marginBottom: 20,
  },
  item: { flex: 1, alignItems: "center" },
  divider: { width: 1, backgroundColor: "#F0D68A" },
  emoji: { fontSize: 22, marginBottom: 4 },
  value: { fontSize: 18, fontWeight: "700", color: colors.textDark },
  label: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
});
