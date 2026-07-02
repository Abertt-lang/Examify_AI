import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function CourseCard({ course, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={[styles.circle, { backgroundColor: course.color }]}>
        <Text style={styles.emoji}>{course.emoji}</Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{course.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emoji: { fontSize: 44 },
  button: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: colors.white, fontWeight: '600', fontSize: 14 },
});
