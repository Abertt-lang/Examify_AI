import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import colors from "../theme/colors";

export default function ScoreRing({ percent, size = 160 }) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (percent / 100);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Riel de fondo (gris) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E9F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Relleno de progreso (verde) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primaryGreen}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${filled}, ${circumference}`}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.centerText}>
        <Text style={styles.percentText}>{percent}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  percentText: { fontSize: 28, fontWeight: "700", color: colors.textDark },
});
