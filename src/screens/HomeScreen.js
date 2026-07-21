import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Background from '../components/Background';
import HomeHeader from '../components/HomeHeader';
import CourseCard from '../components/CourseCard';
import courses from '../theme/courses';
import colors from '../theme/colors';
import ActionRow from '../components/ActionRow';

export default function HomeScreen({ navigation }) {
  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <HomeHeader nombre="Estudiante" />

        <Text style={styles.sectionTitle}>📘 Empezemos por un curso:</Text>

        <View style={styles.grid}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() => navigation.navigate('Topics', { courseId: course.id })}
            />
          ))}
        </View>
        <View style={styles.actionsBlock}>
          <ActionRow
            emoji="📊"
            title="Ver progreso total"
            subtitle="Revisa tu rendimiento general en todos los cursos."
            accentColor={colors.primaryGreenDark}
            onPress={() => navigation.navigate('Progreso')}
        />

          <ActionRow
            emoji="🤖"
            title="Generar cuestionario con IA"
            subtitle="Pregúntale a la IA y obtén un cuestionario nuevo al instante."
            accentColor="#3B82F6"
            onPress={() => navigation.navigate('GenerateQuiz')}
          />

          <ActionRow
            emoji="📤"
            title="Subir archivo"
            subtitle="Selecciona un archivo de tu teléfono y genera un cuestionario con su contenido."
            accentColor="#8B5CF6"
            onPress={() => {
              // TODO: conectar selector de archivos más adelante
          }}
/>

</View>
          
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionsBlock: { marginTop: -70 },
});