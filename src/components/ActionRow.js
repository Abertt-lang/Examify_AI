import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function ActionRow({ emoji, title, subtitle, accentColor, onPress }) {
    return (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}
    >
    <View style={[styles.iconCircle, { backgroundColor: accentColor + '22' }]}>
        <Text style={styles.emoji}>{emoji}</Text>
    </View>

    <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>

    <View style={[styles.arrowCircle, { backgroundColor: accentColor }]}>
        <Text style={styles.arrowText}>→</Text>
    </View>
    </Pressable>
);
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    emoji: { fontSize: 20 },
    textBlock: { flex: 1 },
    title: { fontSize: 14, fontWeight: '700', color: colors.textDark },
    subtitle: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
    arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
},
    arrowText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});
//