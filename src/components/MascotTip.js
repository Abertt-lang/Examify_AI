import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MascotTip({ message, isCorrect }) {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    bounce.setValue(0);
    Animated.spring(bounce, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [message]);

  const translateY = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  return (
    <Animated.View
      style={[styles.row, { opacity: bounce, transform: [{ translateY }] }]}
    >
      <Image
        source={require("../../assets/mascota2.png")}
        style={styles.mascot}
        resizeMode="contain"
      />

      <View
        style={[
          styles.bubble,
          isCorrect ? styles.bubbleCorrect : styles.bubbleWrong,
        ]}
      >
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  mascot: { width: 60, height: 60, marginRight: 10 },
  bubble: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
  },
  bubbleCorrect: {
    backgroundColor: "#E3F5E9",
    borderColor: colors.primaryGreen,
  },
  bubbleWrong: {
    backgroundColor: "#FBE6E6",
    borderColor: "#E05B5B",
  },
  text: { fontSize: 13, color: colors.textDark, fontWeight: "600" },
});
