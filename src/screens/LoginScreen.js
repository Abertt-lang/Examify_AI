import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Ionicons } from "@expo/vector-icons";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import { useAuth } from "../contexts/AuthContext";
import colors from "../theme/colors";

GoogleSignin.configure({
  webClientId: "102549506268-nd854j483hqsll5sfh094rabe10df0us.apps.googleusercontent.com",
  offlineAccess: false,
  scopes: ["profile", "email"],
});

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login, handleGoogleAuth } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Ingresa tu correo y contraseña.");
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      let msg = "Ocurrió un error al iniciar sesión.";
      if (err.code === "auth/user-not-found")
        msg = "No existe una cuenta con este correo.";
      else if (err.code === "auth/wrong-password")
        msg = "Contraseña incorrecta.";
      else if (err.code === "auth/invalid-email")
        msg = "El correo no es válido.";
      else if (err.code === "auth/too-many-requests")
        msg = "Demasiados intentos. Espera unos minutos.";
      else if (err.code === "auth/invalid-credential")
        msg = "Credenciales inválidas. Verifica tu correo y contraseña.";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log("[GOOGLE SIGN-IN] userInfo:", JSON.stringify(userInfo).substring(0, 300));
      const idToken = userInfo?.data?.idToken;
      if (idToken) {
        await handleGoogleAuth(idToken);
      } else {
        Alert.alert("Error", "No se recibió el token de Google.");
      }
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled
      } else if (err.code === statusCodes.IN_PROGRESS) {
        // already in progress
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Error", "Google Play Services no está disponible.");
      } else {
        Alert.alert("Error", "No se pudo iniciar sesión con Google.");
        console.log("[GOOGLE SIGN-IN] Error:", err.code, err.message);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Background>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>
            Aprende de la mejor manera posible
          </Text>

          <View style={styles.form}>
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
                placeholder="Ingresa tu contraseña"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
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

            <PillButton
              title={loading ? "Iniciando sesión..." : "Iniciar sesión"}
              onPress={handleLogin}
              style={loading && { opacity: 0.7 }}
            />

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.dividerLine} />
            </View>

            {googleLoading ? (
              <View style={styles.googleButton}>
                <ActivityIndicator size="small" color={colors.textDark} />
              </View>
            ) : (
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={handleGoogleLogin}
                style={styles.googleButton}
              />
            )}

            <Text style={styles.helper}>¿No tienes cuenta?</Text>
            <PillButton
              title="Regístrate"
              variant="outline"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 70 },
  logoImage: { width: 220, height: 170, alignSelf: "center", marginBottom: 12 },
  tagline: {
    fontSize: 20,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 2,
    marginBottom: 24,
    fontWeight: "700",
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E0E5EA" },
  dividerText: {
    marginHorizontal: 12,
    color: colors.textMuted,
    fontWeight: "600",
    fontSize: 13,
  },
  googleButton: {
    width: "100%",
    height: 48,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  helper: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: 18,
    marginBottom: 4,
    fontSize: 13,
  },
});
