import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import colors from "../theme/colors";

export default function RegisterScreen({ navigation }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [esHumano, setEsHumano] = useState(false);

  const handleRegister = () => {
    // TODO: conectar con Firebase Auth
    console.log({ nombres, apellidos, usuario, contrasena, esHumano });
  };

  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
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
            value={nombres}
            onChangeText={setNombres}
          />

          <Text style={styles.label}>Apellidos</Text>
          <TextInput
            style={styles.input}
            value={apellidos}
            onChangeText={setApellidos}
          />

          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <Text style={styles.label}>Confirma tu contraseña</Text>
          <TextInput
            style={styles.input}
            value={confirmar}
            onChangeText={setConfirmar}
            secureTextEntry
          />

          <Pressable
            style={styles.checkboxRow}
            onPress={() => setEsHumano(!esHumano)}
          >
            <View
              style={[styles.checkbox, esHumano && styles.checkboxChecked]}
            />
            <Text style={styles.checkboxLabel}>¿Eres un humano?</Text>
          </Pressable>

          <Text style={styles.helper}>o</Text>
          <PillButton
            title="Registrarse"
            onPress={() => navigation.navigate("Login")}
          />
          <Text style={styles.helper}>o</Text>
          <PillButton
            title="Tengo cuenta"
            variant="outline"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  logoImage: { width: 250, height: 200, alignSelf: "center", marginBottom: 20 },
  container: { paddingHorizontal: 28, paddingTop: 60, paddingBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 20,
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textDark,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: colors.textMuted,
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryGreen,
    borderColor: colors.primaryGreenDark,
  },
  checkboxLabel: { color: colors.textDark, fontSize: 14 },
  helper: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: 14,
    marginBottom: 4,
  },
});
