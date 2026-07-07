import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function CourseProgressRow({ emoji, name, percent }) {
    return (
    <View style={styles.row}>
        <View style={styles.iconCircle}>
        <Text style={styles.emoji}>{emoji}</Text>
    </View>

        <View style={styles.middle}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${percent}%` }]} />
        </View>
        </View>

        <Text style={styles.percent}>{percent}%</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    },
    iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    },
    emoji: { fontSize: 18 },
    middle: { flex: 1 },
    name: { fontSize: 14, fontWeight: '700', color: colors.textDark, marginBottom: 6 },
    barTrack: {
    height: 6,
    backgroundColor: '#E5E9F0',
    borderRadius: 3,
    overflow: 'hidden',
    },
    barFill: {
    height: '100%',
    backgroundColor: colors.primaryGreen,
    borderRadius: 3,
    },
        percent: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primaryGreenDark,
        marginLeft: 10,
    },
});