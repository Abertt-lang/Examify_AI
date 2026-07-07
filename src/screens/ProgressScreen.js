import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Background from '../components/Background';
import ProgressHeader from '../components/ProgressHeader';
import StatCard from '../components/StatCard';
import CourseProgressRow from '../components/CourseProgressRow';
import mockProgress from '../theme/mockProgress';
import colors from '../theme/colors';

export default function ProgressScreen() {
  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <ProgressHeader />

        <View style={styles.statsRow}>
          <StatCard
            emoji="📋"
            value={mockProgress.cursosEnProgreso}
            label={'Cursos en\nprogreso'}
            bg="#E4EEFB"
            iconBg="#BBD6F5"
          />
          <StatCard
            emoji="🏆"
            value={mockProgress.leccionesCompletadas}
            label={'Lecciones\ncompletadas'}
            bg="#E3F5E9"
            iconBg="#B8E6C8"
          />
          <StatCard
            emoji="🎯"
            value={`${mockProgress.progresoTotal}%`}
            label={'Progreso\ntotal'}
            bg="#EDE7FB"
            iconBg="#D2C4F5"
          />
        </View>

        <Text style={styles.sectionTitle}>Progreso por curso</Text>

        {mockProgress.porCurso.map((curso) => (
          <CourseProgressRow
            key={curso.id}
            emoji={curso.emoji}
            name={curso.name}
            percent={curso.percent}
          />
        ))}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 12,
  },
});