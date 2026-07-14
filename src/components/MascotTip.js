import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function MascotTip({ message, isCorrect }) {
  const bounce = useRef(new Animated.Value(0)).current;
  const scaleBounce = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    bounce.setValue(0);
    scaleBounce.setValue(0);

    Animated.parallel([
      Animated.spring(bounce, {
        toValue: 1,
        friction: 4,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(100),
        Animated.spring(scaleBounce, {
          toValue: 1,
          friction: 3,
          tension: 70,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [message]);

  const translateY = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const mascotScale = scaleBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  const mascotImage = isCorrect
    ? require("../../assets/robotbien1.png")
    : require("../../assets/robotfalla1.png");

  return (
    <Animated.View
      style={[styles.container, { opacity: bounce, transform: [{ translateY }] }]}
    >
      <Animated.View
        style={[
          styles.mascotWrapper,
          {
            transform: [{ scale: Animated.multiply(mascotScale, pulseAnim) }],
          },
        ]}
      >
        <Image
          source={mascotImage}
          style={styles.mascot}
          resizeMode="contain"
        />
      </Animated.View>

      <View
        style={[
          styles.bubble,
          isCorrect ? styles.bubbleCorrect : styles.bubbleWrong,
        ]}
      >
        <View style={styles.bubbleHeader}>
          <Ionicons
            name={isCorrect ? "trophy" : "heart"}
            size={16}
            color={isCorrect ? "#FF9800" : "#E05B5B"}
          />
          <Text style={[styles.bubbleLabel, { color: isCorrect ? colors.primaryGreenDark : "#E05B5B" }]}>
            {isCorrect ? "¡Correcto!" : "¡Intenta de nuevo!"}
          </Text>
        </View>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mascotWrapper: {
    marginRight: 12,
  },
  mascot: { width: 100, height: 100 },
  bubble: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
  },
  bubbleCorrect: {
    backgroundColor: "#E3F5E9",
  },
  bubbleWrong: {
    backgroundColor: "#FBE6E6",
  },
  bubbleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  bubbleLabel: {
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 6,
  },
  text: {
    fontSize: 13,
    color: colors.textDark,
    fontWeight: "500",
    lineHeight: 19,
  },
});
