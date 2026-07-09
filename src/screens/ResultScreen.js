import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, ScrollView, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Background from '../components/Background';
import PillButton from '../components/PillButton';
import ScoreRing from '../components/ScoreRing';
import MiniStat from '../components/MiniStat';
import RewardCard from '../components/RewardCard';
import colors from '../theme/colors';

export default function ResultScreen({ route, navigation }) {
  const { score = 0, total = 1, topicName = '' } = route.params || {};
  const percent = Math.round((score / total) * 100);
  const incorrectas = total - score;
  const monedasGanadas = score * 2;
  const xpGanado = score * 10 + (percent >= 80 ? 20 : 0);

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, []);

  const getMessage = () => {
    if (percent >= 80) return '¡Excelente!';
    if (percent >= 60) return '¡Buen trabajo!';
    if (percent >= 40) return 'Vas por buen camino';
    return 'Sigue practicando';
  };

  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Resultados</Text>
        <Text style={styles.subtitle}>{topicName}</Text>

        <Animated.View style={[styles.ringWrapper, { transform: [{ scale }] }]}>
          <ScoreRing percent={percent} />
        </Animated.View>

        <Text style={styles.message}>{getMessage()}</Text>
        <Text style={styles.detail}>
          {score} de {total} respuestas correctas
        </Text>

        <View style={styles.statsRow}>
          <MiniStat value={score} label="Correctas" />
          <MiniStat value={incorrectas} label="Incorrectas" />
          <MiniStat value={total} label="Total" />
        </View>

        <RewardCard monedas={monedasGanadas} xp={xpGanado} />

        <Pressable style={styles.summaryRow} onPress={() => {}}>
          <Text style={styles.summaryText}>Ver resumen de respuestas</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.primaryGreenDark} />
        </Pressable>

        <Image
          source={require('../../assets/Mascota.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        <PillButton
          title="Volver al inicio"
          onPress={() => navigation.navigate('Main')}
        />
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: colors.textDark },
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 30 },
  ringWrapper: { marginBottom: 20 },
  message: { fontSize: 20, fontWeight: '700', color: colors.primaryGreenDark },
  detail: { fontSize: 14, color: colors.textMuted, marginTop: 4, marginBottom: 24 },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  summaryText: { fontSize: 14, fontWeight: '600', color: colors.primaryGreenDark, marginRight: 4 },
  mascot: { width: 130, height: 130, marginBottom: 10 },
});