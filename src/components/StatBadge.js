import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function StatBadge({ emoji, value }) {
    return (
        <View style={styles.badge}>
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={styles.value}>{value}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primaryGreen,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },
    emoji: { fontSize: 18, marginRight: 8 },
    value: { color: colors.white, fontWeight: '700', fontSize: 18 },
    });