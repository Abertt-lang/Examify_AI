import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function StatCard({ emoji, value, label, bg, iconBg }) {
    return (
    <View style={[styles.card, { backgroundColor: bg }]}>
        <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
        <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    },
    iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    },
    emoji: { fontSize: 16 },
    value: { fontSize: 22, fontWeight: '700', color: colors.textDark },
    label: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});