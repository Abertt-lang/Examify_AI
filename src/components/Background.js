import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import colors from '../theme/colors';

// Una hoja simple hecha con un Path. La reusamos rotada/escalada en distintas
// esquinas para lograr el efecto decorativo del diseño original.
const Leaf = ({ x, y, size = 60, rotate = '0deg', opacity = 0.5 }) => (
  <View style={{ position: 'absolute', left: x, top: y, transform: [{ rotate }] }}>
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 95 C20 80 10 40 50 5 C90 40 80 80 50 95 Z"
        fill={colors.decor}
        opacity={opacity}
      />
    </Svg>
  </View>
);

// Un destello (sparkle) de 4 puntas, también vectorial.
const Sparkle = ({ x, y, size = 16, opacity = 0.7 }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
        fill={colors.white}
        opacity={opacity}
      />
    </Svg>
  </View>
);

export default function Background({ children }) {
  return (
    <LinearGradient
      colors={[colors.gradientTop, colors.gradientBottom]}
      style={styles.container}
    >
      {/* Decoraciones de fondo: ajusta posiciones/tamaños a tu gusto */}
      <Leaf x={-10} y={40} size={90} rotate="-20deg" />
      <Leaf x={300} y={120} size={70} rotate="35deg" opacity={0.4} />
      <Leaf x={-20} y={560} size={100} rotate="10deg" opacity={0.4} />
      <Sparkle x={40} y={20} size={14} />
      <Sparkle x={320} y={60} size={10} />
      <Sparkle x={20} y={300} size={12} />
      <Sparkle x={330} y={420} size={16} />

      {/* Contenido real de la pantalla, va por encima de las decoraciones */}
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, zIndex: 1 },
});
