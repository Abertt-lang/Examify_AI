import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function CourseCard({ course, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: course.bg },
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={styles.emoji}>{course.emoji}</Text>
      <Text style={styles.name}>{course.name}</Text>
      <View style={styles.arrowCircle}>
        <Text style={styles.arrowText}>→</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '46%',
    aspectRatio: 0.85,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    paddingTop: 10,
    width: '45%',
  },
  emoji: { fontSize: 45, marginBottom: 8 },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  
  arrowText: { color: colors.white, fontWeight: '700', fontSize: 14 },
});