import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function ResultBarChart({ correct, incorrect, total }) {
  const correctWidth = useRef(new Animated.Value(0)).current;
  const incorrectWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const correctPercent = total > 0 ? correct / total : 0;
    const incorrectPercent = total > 0 ? incorrect / total : 0;

    Animated.sequence([
      Animated.timing(correctWidth, {
        toValue: correctPercent,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(incorrectWidth, {
        toValue: incorrectPercent,
        duration: 600,
        useNativeDriver: false,
      }),
    ]).start();
  }, [correct, incorrect, total, correctWidth, incorrectWidth]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distribución de respuestas</Text>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primaryGreen }]} />
          <Text style={styles.legendText}>Correctas ({correct})</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#E05B5B" }]} />
          <Text style={styles.legendText}>Incorrectas ({incorrect})</Text>
        </View>
      </View>

      <View style={styles.barContainer}>
        <View style={styles.barTrack}>
          <Animated.View
            style={[
              styles.barCorrect,
              {
                width: correctWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.barIncorrect,
              {
                width: incorrectWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{correct}</Text>
          <Text style={styles.statLabel}>Buenas</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: "#E05B5B" }]}>{incorrect}</Text>
          <Text style={styles.statLabel}>Malas</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
  },
  legendRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  barContainer: {
    marginBottom: 16,
  },
  barTrack: {
    flexDirection: "row",
    height: 24,
    backgroundColor: "#E5E9F0",
    borderRadius: 12,
    overflow: "hidden",
  },
  barCorrect: {
    height: "100%",
    backgroundColor: colors.primaryGreen,
    borderRadius: 12,
  },
  barIncorrect: {
    height: "100%",
    backgroundColor: "#E05B5B",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F3F6",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primaryGreenDark,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#F0F3F6",
  },
});