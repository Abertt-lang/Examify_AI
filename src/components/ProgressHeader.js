import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function ProgressHeader() {
    return (
    <View style={styles.row}>
        <View style={styles.textBlock}>
        <Text style={styles.title}>
            ¡Tu progreso{'\n'}
            <Text style={styles.titleAccent}>importa!</Text>
        </Text>
        <Text style={styles.subtitle}>
            Sigue aprendiendo y alcanzando tus metas ✨
        </Text>
        </View>

        <Image
        source={require('../../assets/Mascotaprogreso.png')}
        style={styles.mascot}
        resizeMode="contain"
        />
    </View>
    );
}

const styles = StyleSheet.create({
    row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    },
    textBlock: { flex: 1 },
    title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textDark,
    lineHeight: 32,
    },
    titleAccent: { color: colors.primaryGreenDark },
    subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
    },
    mascot: {
    width: 110,
    height: 110,
    },
});