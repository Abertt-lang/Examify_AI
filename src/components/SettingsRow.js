import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function SettingsRow({
    icon,
    iconColor,
    iconBg,
    title,
    subtitle,
    onPress,
}) {
    return (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
    <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
    </View>

    <View style={styles.middle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>

    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    },
    iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    },
    middle: { flex: 1 },
    title: { fontSize: 14, fontWeight: "700", color: colors.textDark },
    subtitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
