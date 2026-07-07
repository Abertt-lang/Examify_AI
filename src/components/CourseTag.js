import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function CourseTag({ name, tone = 'light' }) {
    return (
    <View style={[styles.tag, tone === 'light' && styles.tagLight]}>
        <Text style={styles.text}>{name}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    tag: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 14,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
    },
    tagLight: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    },
    text: { color: colors.textDark, fontWeight: '600' },
});