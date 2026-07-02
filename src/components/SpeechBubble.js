import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function SpeechBubble({ title, subtitle }) {
    return (
    <View style={styles.wrapper}>
        <View style={styles.bubble}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
      {/* El triangulito que apunta hacia abajo */}
        <View style={styles.pointer} />
    </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bubble: {
        backgroundColor: colors.white,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primaryGreenDark,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        color: colors.textMuted,
    },
    pointer: {
    width: 0,
        height: 0,
        marginLeft: 40,
        borderLeftWidth: 14,
        borderRightWidth: 14,
        borderTopWidth: 18,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: colors.primaryGreenDark,
    },
});