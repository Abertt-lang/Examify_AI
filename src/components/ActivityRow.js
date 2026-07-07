import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function ActivityRow({ emoji, text, fecha, xp }) {
    return (
    <View style={styles.row}>
        <View style={styles.iconCircle}>
        <Text style={styles.emoji}>{emoji}</Text>
        </View>

        <View style={styles.middle}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.fecha}>{fecha}</Text>
        </View>

        <View style={styles.xpBadge}>
        <Text style={styles.xpText}>+{xp} XP</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    },
    iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E4EEFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    },
    emoji: { fontSize: 16 },
    middle: { flex: 1 },
    text: { fontSize: 13, fontWeight: '600', color: colors.textDark },
    fecha: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
    xpBadge: {
    backgroundColor: '#E3F5E9',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    },
    xpText: { fontSize: 11, fontWeight: '700', color: colors.primaryGreenDark },
});
//