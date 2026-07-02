import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import Background from '../components/Background';
import PillButton from '../components/PillButton';
import colors from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    // TODO: conectar con Firebase Auth
    navigation.navigate('Home');
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Aprende de la mejor manera posible</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            placeholderTextColor={colors.placeholder}
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor={colors.placeholder}
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <PillButton title="Iniciar sesión" onPress={handleLogin} />

          <Text style={styles.helper}>Si no tienes cuenta</Text>
          <PillButton
            title="Regístrate"
            variant="outline"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 80 },
  logoImage: { width: 250, height: 200, alignSelf: 'center', marginBottom: 20 },
  tagline: {
    fontSize: 22,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 30,
    fontFamily: 'Decorative_400Regular',
    fontWeight: '700',
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 20,
    padding: 20,
  },
  label: { fontSize: 14, color: colors.textDark, marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textDark,
  },
  helper: { textAlign: 'center', color: colors.textMuted, marginTop: 18, marginBottom: 4 },
});
