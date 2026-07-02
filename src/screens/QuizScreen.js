import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../components/Background';
import colors from '../theme/colors';

export default function QuizScreen() {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Pregunta 1</Text>
        <Text style={styles.subtitle}>Aquí van las opciones de respuesta</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: colors.textDark },
  subtitle: { color: colors.textMuted, marginTop: 8 },
});
