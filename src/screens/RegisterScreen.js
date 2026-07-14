import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import { useAuth } from "../contexts/AuthContext";
import colors from "../theme/colors";

export default function RegisterScreen({ navigation }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [esHumano, setEsHumano] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleRegister = async () => {
    if (!nombres.trim()) {
      Alert.alert("Error", "Ingresa tus nombres.");
      return;
    }
    if (!apellidos.trim()) {
      Alert.alert("Error", "Ingresa tus apellidos.");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Ingresa tu correo electrónico.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmar) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    if (!esHumano) {
      Alert.alert("Error", "Confirma que eres un humano.");
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password, nombres.trim(), apellidos.trim());
      Alert.alert(
        "¡Cuenta creada!",
        "Tu cuenta ha sido creada exitosamente."
      );
    } catch (err) {
      let msg = "Ocurrió un error al crear la cuenta.";
      if (err.code === "auth/email-already-in-use")
        msg = "Ya existe una cuenta con este correo.";
      else if (err.code === "auth/invalid-email")
        msg = "El correo no es válido.";
      else if (err.code === "auth/weak-password")
        msg = "La contraseña es muy débil. Usa al menos 6 caracteres.";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>Únete a una gran familia</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Nombres</Text>
            <TextInput
              style={styles.input}
              placeholder="Tus nombres"
              placeholderTextColor={colors.placeholder}
              value={nombres}
              onChangeText={setNombres}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Apellidos</Text>
            <TextInput
              style={styles.input}
              placeholder="Tus apellidos"
              placeholderTextColor={colors.placeholder}
              value={apellidos}
              onChangeText={setApellidos}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="tucorreo@ejemplo.com"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
              />
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.placeholder}
                />
              </Pressable>
            </View>

            <Text style={styles.label}>Confirma tu contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Repite tu contraseña"
              placeholderTextColor={colors.placeholder}
              value={confirmar}
              onChangeText={setConfirmar}
              secureTextEntry
              autoComplete="new-password"
            />

            <Pressable
              style={styles.checkboxRow}
              onPress={() => setEsHumano(!esHumano)}
            >
              <View
                style={[styles.checkbox, esHumano && styles.checkboxChecked]}
              >
                {esHumano && (
                  <Ionicons name="checkmark" size={14} color={colors.white} />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                Confirmo que soy una persona
              </Text>
            </Pressable>

            <PillButton
              title={loading ? "Creando cuenta..." : "Registrarse"}
              onPress={handleRegister}
              style={loading && { opacity: 0.7 }}
            />

            <Text style={styles.helper}>¿Ya tienes una cuenta?</Text>
            <PillButton
              title="Iniciar sesión"
              variant="outline"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  logoImage: { width: 200, height: 150, alignSelf: "center", marginBottom: 10 },
  container: { paddingHorizontal: 28, paddingTop: 50, paddingBottom: 40 },
  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 20,
    padding: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textDark,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textDark,
    borderWidth: 1,
    borderColor: "#E5E9F0",
  },
  passwordWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E9F0",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textDark,
  },
  eyeButton: { paddingHorizontal: 14 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: colors.placeholder,
    borderRadius: 6,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primaryGreen,
    borderColor: colors.primaryGreenDark,
  },
  checkboxLabel: { color: colors.textDark, fontSize: 14, fontWeight: "500" },
  helper: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: 16,
    marginBottom: 4,
    fontSize: 13,
  },
});
