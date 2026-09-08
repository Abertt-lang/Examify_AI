import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import colors from "../theme/colors";

export default function WaterFillCircle({ percent, size = 180, duration = 1500 }) {
  const fillAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 50,
      delay: 100,
      useNativeDriver: true,
    }).start();

    const listener = fillAnim.addListener(({ value }) => {
      setDisplayPercent(Math.round(value));
    });

    Animated.timing(fillAnim, {
      toValue: percent,
      duration,
      useNativeDriver: false,
    }).start();

    return () => {
      fillAnim.removeListener(listener);
    };
  }, [percent, duration, fillAnim, scaleAnim]);

  const getColor = () => {
    if (percent >= 80) return colors.primaryGreen;
    if (percent >= 60) return "#FF9800";
    return "#E05B5B";
  };

  const r = (size - 16) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const color = getColor();
  const currentPercent = Math.min(displayPercent, 100);
  const waterSize = size * 0.62;

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <View style={[styles.circleWrapper, { width: size, height: size }]}>
        <Svg width={size} height={size}>
          <Circle
            cx={cx}
            cy={cy}
            r={r}
            stroke="#E5E9F0"
            strokeWidth={8}
            fill="none"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={r}
            stroke={color}
            strokeWidth={8}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - currentPercent / 100)}
            strokeLinecap="round"
            transform={`rotate(-90, ${cx}, ${cy})`}
          />
        </Svg>

        <View
          style={[
            styles.waterLayer,
            {
              width: waterSize,
              height: waterSize,
              borderRadius: waterSize / 2,
              backgroundColor: color + "2E",
              borderColor: color + "4D",
            },
          ]}
        />

        <View style={styles.centerText}>
          <Text style={[styles.percentText, { color }]}>{currentPercent}%</Text>
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
    marginBottom: 20,
  },
  circleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  waterLayer: {
    position: "absolute",
    borderWidth: 2,
    opacity: 0.8,
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  percentText: {
    fontSize: 42,
    fontWeight: "800",
  },
  label: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
});
