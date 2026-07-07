import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function AchievementBadge({ emoji, color, title, subtitle }) {
    return (
    <View style={styles.wrapper}>
        <View style={[styles.shield, { backgroundColor: color }]}>
        <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { width: 88, alignItems: 'center', marginRight: 10 },
    shield: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    },
    emoji: { fontSize: 24 },
    title: { fontSize: 12, fontWeight: '700', color: colors.textDark, textAlign: 'center' },
    subtitle: { fontSize: 10, color: colors.textMuted, textAlign: 'center', marginTop: 2 },
});
//Este componente representa una insignia de logro que se muestra en la pantalla de progreso. Recibe un emoji, un color, un título y un subtítulo como props. Se utiliza para mostrar los logros del usuario en la aplicación.