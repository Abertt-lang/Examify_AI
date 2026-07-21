import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function ScoreRing({ percent, size = 160 }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const getColor = () => {
    if (percent >= 80) return colors.primaryGreen;
    if (percent >= 60) return "#FF9800";
    return "#E05B5B";
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { width: size, height: size, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, borderColor: getColor() }]}>
        <View style={styles.innerCircle}>
          <Text style={[styles.percentText, { color: getColor() }]}>{percent}%</Text>
          <Text style={styles.label}>correcto</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  innerCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentText: {
    fontSize: 36,
    fontWeight: "800",
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
});
