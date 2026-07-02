import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../components/Background';
import CourseCard from '../components/CourseCard';
import courses from '../theme/courses';
import colors from '../theme/colors';

export default function HomeScreen({ navigation }) {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Elegir tema:</Text>
        <Text style={styles.subtitle}>Cursos</Text>

        <View style={styles.grid}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() => navigation.navigate('Quiz', { courseId: course.id })}
            />
          ))}
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: '700', color: colors.textDark },
  subtitle: { fontSize: 20, color: colors.textDark, marginTop: 4, marginBottom: 24 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
