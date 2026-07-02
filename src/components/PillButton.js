import React, { useRef, useState } from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import colors from '../theme/colors';

export default function PillButton({ title, onPress, variant = 'solid', style, textStyle }) {
  const isSolid = variant === 'solid';
  const [loading, setLoading] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (loading) return; // evita doble toque mientras carga

    setLoading(true);
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 900,
      useNativeDriver: false, // el ancho no soporta el driver nativo
    }).start(() => {
      setLoading(false);
      onPress && onPress();
    });
  };

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.base, isSolid ? styles.solid : styles.outline, style]}
    >
      <Animated.View style={[styles.fill, { width: fillWidth }]} />
      <Text style={[isSolid ? styles.solidText : styles.outlineText, textStyle]}>
        {loading ? 'Cargando...' : title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
    overflow: 'hidden',
    
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.primaryGreenDark,
  },
  solid: {
    backgroundColor: colors.primaryGreen,
  },
  solidText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primaryGreenDark,
  },
  outlineText: {
    color: colors.primaryGreenDark,
    fontWeight: '600',
    fontSize: 16,
  },
  Text: {
    fontFamily: 'Inter_400Regular',
  },
});