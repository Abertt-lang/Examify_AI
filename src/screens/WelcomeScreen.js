import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Background from '../components/Background';
import PillButton from '../components/PillButton';
import colors from '../theme/colors';
import MascotaExamify from '../../assets/Mascota.png';
import Logo from '../../assets/logo.png';
import SpeechBubble from '../components/SpeechBubble.js';

export default function WelcomeScreen({ navigation }) {
    return (
    <Background>
        <View style={styles.container}>

        
        <Image
            source={require('../../assets/logo.png')}
            style={styles.mainImage}
            resizeMode="contain"
        />

        <SpeechBubble
            title="!Empezemos a estudiar!"
            subtitle="Tu compañero de estudio con inteligencia artificial"
        />

        <Image
            source={require('../../assets/Mascota.png')}
            style={styles.Mascota}
            resizeMode="contain"
/>

        <PillButton
            title="Iniciemos"
            onPress={() => navigation.navigate('Login')}
            style={styles.PillButton}
            textStyle={styles.PillButtonText}
        />

        </View>
    </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage: {
        width: 260,
        height: 260,
        marginBottom: 7,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.textDark,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: 30,
    },
    Mascota: {
        width: 300,
        height: 300,
        marginBottom: 2,
    },
    PillButton: {
        width: 200,
        marginTop:15,
        paddingVertical: 15,
        fontSize: 24,
    },
    PillButtonText: {
        fontSize: 25,
        fontWeight: '500',
        fontFamily: 'Decorative_400Regular',
        
    },
});