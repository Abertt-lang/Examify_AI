import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import LottieView from "lottie-react-native";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import colors from "../theme/colors";
import { generateQuizFromDocument } from "../services/gemini";

const FILE_TYPES = {
  pdf: ["application/pdf"],
  image: ["image/jpeg", "image/jpg", "image/png"],
};

const ALL_TYPES = [...FILE_TYPES.pdf, ...FILE_TYPES.image];

function getMimeType(name) {
  const ext = name.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["jpg", "jpeg", "png"].includes(ext)) return "image";
  return "unknown";
}

export default function GenerateQuizScreen({ navigation }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const generatedQuestions = useRef(null);
  const successAnim = useRef(new Animated.Value(0)).current;

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ALL_TYPES,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        const picked = result.assets[0];
        const fileType = getMimeType(picked.name);

        if (fileType === "image" || fileType === "pdf") {
          const fileObj = new File(picked.uri);
          const base64 = await fileObj.base64();

          if (!base64 || base64.length < 100) {
            Alert.alert("Error", "El archivo parece estar vacío o no se pudo leer.");
            return;
          }

          setFile({
            name: picked.name,
            type: fileType,
            base64,
            uri: picked.uri,
          });
        } else {
          Alert.alert("Formato no soportado", "Selecciona un archivo PDF o imagen (JPG/PNG).");
        }
      }
    } catch (err) {
      console.error("[PICK FILE] Error:", err.message);
      Alert.alert("Error", "No se pudo leer el archivo. " + err.message);
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      Alert.alert("Error", "Selecciona un archivo primero.");
      return;
    }

    setLoading(true);
    try {
      const questions = await generateQuizFromDocument(file.base64, file.name);

      if (!questions || questions.length === 0) {
        Alert.alert("Error", "No se pudieron generar preguntas. Intenta con otro archivo.");
        setLoading(false);
        return;
      }

      generatedQuestions.current = questions;
      setShowSuccess(true);
      successAnim.setValue(0);
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      console.error("[GENERATE] Error:", err.message);
      Alert.alert("Error", "No se pudieron generar las preguntas. Intenta de nuevo.");
      setLoading(false);
    }
  };

  const goToQuiz = () => {
    if (!generatedQuestions.current) return;
    navigation.replace("Quiz", {
      courseId: "ai",
      topicId: "ai_generated",
      difficulty: "medio",
      aiQuestions: generatedQuestions.current,
    });
  };

  if (loading) {
    return (
      <Background>
        <View style={styles.loadingContainer}>
          {showSuccess ? (
            <Animated.View
              style={{
                alignItems: "center",
                opacity: successAnim,
                transform: [
                  {
                    scale: successAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              }}
            >
              <LottieView
                source={require("../../assets/animations/Check Mark - Success.json")}
                autoPlay
                loop={false}
                speed={1.2}
                style={styles.successAnimation}
                onAnimationFinish={() => goToQuiz()}
              />
              <Text style={styles.loadingText}>¡Cuestionario listo!</Text>
              <Text style={styles.loadingSubtext}>Preparando tus preguntas...</Text>
            </Animated.View>
          ) : (
            <>
              <ActivityIndicator size="large" color={colors.primaryGreen} />
              <Text style={styles.loadingText}>Generando preguntas...</Text>
              <Text style={styles.loadingSubtext}>La IA está analizando tu archivo</Text>
            </>
          )}
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textDark} />
        </Pressable>

        <Text style={styles.title}>Generar cuestionario con IA</Text>
        <Text style={styles.subtitle}>
          Sube un PDF o imagen y la IA creará preguntas basadas en su contenido
        </Text>

        <Pressable style={styles.fileButton} onPress={handlePickFile}>
          <Ionicons
            name={file ? "document-text" : "cloud-upload-outline"}
            size={48}
            color={file ? colors.primaryGreenDark : colors.textMuted}
          />
          <Text style={[styles.fileTitle, file && styles.fileTitleSelected]}>
            {file ? file.name : "Seleccionar archivo"}
          </Text>
          <Text style={styles.fileSubtext}>
            {file
              ? file.type === "image"
                ? "Imagen — Toca para cambiar"
                : "PDF — Toca para cambiar"
              : "Archivos PDF, JPG o PNG"}
          </Text>
        </Pressable>

        {file && file.type === "image" && file.uri && (
          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>Vista previa:</Text>
            <Image
              source={{ uri: file.uri }}
              style={styles.imagePreview}
              resizeMode="contain"
            />
          </View>
        )}

        {file && file.type === "pdf" && (
          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>PDF seleccionado:</Text>
            <Text style={styles.previewText}>Archivo PDF listo para generar preguntas con IA</Text>
          </View>
        )}

        <View style={styles.generateContainer}>
          <PillButton
            title="Generar cuestionario"
            onPress={handleGenerate}
          />
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  backButton: { marginBottom: 12 },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 24,
    lineHeight: 20,
  },
  fileButton: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.primaryGreenDark,
    marginBottom: 16,
  },
  fileTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textMuted,
    marginTop: 12,
  },
  fileTitleSelected: {
    color: colors.textDark,
  },
  fileSubtext: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  previewCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
    marginBottom: 6,
  },
  previewText: {
    fontSize: 13,
    color: colors.textDark,
    lineHeight: 18,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  generateContainer: {
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    marginTop: 20,
  },
  loadingSubtext: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 6,
  },
  successAnimation: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
});
