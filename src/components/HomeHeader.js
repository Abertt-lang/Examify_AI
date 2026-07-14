import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function HomeHeader({ nombre = 'Estudiante' }) {
    return (
    <View style={styles.row}>
        <View style={styles.textBlock}>
        <Text style={styles.greeting}>
            ¡Hola,{'\n'}
            <Text style={styles.greetingAccent}>{nombre}!</Text>
        </Text>
        <Text style={styles.question}>¿Qué vamos a estudiar hoy?</Text>
    </View>

    <Image
        source={require('../../assets/mascota2.png')}
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
        greeting: {
        fontSize: 43,
        fontWeight: '700',
        color: colors.textDark,
        lineHeight: 45,
        fontFamily: 'Poppins_700Bold',
    },
    greetingAccent: { color: colors.primaryGreenDark },
    question: {
        fontSize: 15,
        color: colors.textMuted,
        marginTop: 6,
    },
    mascot: {
        width: 130,
        height: 180,
    },
});