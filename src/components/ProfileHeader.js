import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function ProfileHeader() {
    return (
    <View style={styles.row}>
        <View style={styles.textBlock}>
        <Text style={styles.title}>
            Mi <Text style={styles.titleAccent}>Perfil</Text>
        </Text>
        <Text style={styles.subtitle}>
            Gestiona tu información y sigue tu evolución ✨
        </Text>
    </View>

    <Image
        source={require('../../assets/Mascotaperfil.png')}
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
    fontSize: 40,
    fontWeight: '700',
    color: colors.textDark,
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