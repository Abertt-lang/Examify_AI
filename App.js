import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator, View, LogBox } from "react-native";

import {
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

LogBox.ignoreLogs(["fontFamily", "Non-serializable"]);

console.log("[APP] Module loaded");

export default function App() {
  console.log("[APP] Rendering App component");

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_900Black,
  });

  useEffect(() => {
    console.log("[APP] fontsLoaded:", fontsLoaded, "fontError:", fontError);
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    console.log("[APP] Showing font loading spinner");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6FCF57" />
      </View>
    );
  }

  if (fontError) {
    console.log("[APP] Font error occurred, continuing anyway");
  }

  console.log("[APP] Fonts loaded, rendering AuthProvider + AppNavigator");

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
