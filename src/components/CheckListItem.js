import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function CheckListItem({ text }) {
  return (
    <View style={styles.row}>
      <Ionicons name="checkmark" size={16} color={colors.primaryGreenDark} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  text: { fontSize: 14, color: colors.textDark, marginLeft: 10 },
});
