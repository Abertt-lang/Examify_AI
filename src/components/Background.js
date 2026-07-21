import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

const Leaf = ({ x, y, size = 60, rotate = '0deg', opacity = 0.5 }) => (
  <View
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.decor,
      opacity,
      transform: [{ rotate }, { scaleX: 0.5 }],
    }}
  />
);

const Sparkle = ({ x, y, size = 16, opacity = 0.7 }) => (
  <View
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.white,
      opacity,
    }}
  />
);

export default function Background({ children }) {
  return (
    <LinearGradient
      colors={[colors.gradientTop, colors.gradientBottom]}
      style={styles.container}
    >
      <Leaf x={-10} y={40} size={90} rotate="-20deg" />
      <Leaf x={300} y={120} size={70} rotate="35deg" opacity={0.4} />
      <Leaf x={-20} y={560} size={100} rotate="10deg" opacity={0.4} />
      <Sparkle x={40} y={20} size={14} />
      <Sparkle x={320} y={60} size={10} />
      <Sparkle x={20} y={300} size={12} />
      <Sparkle x={330} y={420} size={16} />

      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, zIndex: 1 },
});
