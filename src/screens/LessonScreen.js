import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import { topicsByCourse, difficultyLevels } from "../theme/curriculum";
import mockLessons from "../theme/mockLessons";
import colors from "../theme/colors";

export default function LessonScreen({ route, navigation }) {
  const { courseId, topicId, difficulty } = route.params;
  const topic = (topicsByCourse[courseId] || []).find((t) => t.id === topicId);
  const diffInfo = difficultyLevels.find((d) => d.id === difficulty) || difficultyLevels[0];

  const topicLessons = mockLessons[topicId];
  const lesson = topicLessons?.[difficulty] || topicLessons?.facil || {
    titulo: "Lección",
    contenido: [{ tipo: "intro", texto: "Contenido de lección no disponible aún." }],
  };

  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const contentScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    contentScale.setValue(0.95);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(contentScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const content = lesson.contenido[currentStep];
  const isLast = currentStep === lesson.contenido.length - 1;
  const totalSteps = lesson.contenido.length;

  const renderContent = () => {
    if (!content) return null;

    switch (content.tipo) {
      case "intro":
        return (
          <View style={[styles.contentCard, styles.introCard]}>
            <View style={styles.introRow}>
              <Image
                source={require("../../assets/mascota2.png")}
                style={styles.smallMascot}
                resizeMode="contain"
              />
              <View style={styles.introTextWrap}>
                <Text style={styles.introLabel}>Introducción</Text>
                <Text style={styles.introText}>{content.texto}</Text>
              </View>
            </View>
          </View>
        );
      case "concepto":
        return (
          <View style={styles.contentCard}>
            <View style={styles.conceptBadge}>
              <View style={styles.conceptIconWrap}>
                <Ionicons name="bulb" size={20} color="#FF9800" />
              </View>
              <Text style={styles.conceptTitle}>{content.titulo}</Text>
            </View>
            <Text style={styles.conceptText}>{content.texto}</Text>
            {content.subItems && content.subItems.map((item, i) => (
              <View key={i} style={styles.subItem}>
                <View style={[styles.subDot, { backgroundColor: diffInfo.color }]} />
                <Text style={styles.subItemText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      case "ejemplo":
        return (
          <View style={[styles.contentCard, styles.exampleCard]}>
            <View style={styles.exampleBadge}>
              <View style={styles.exampleIconWrap}>
                <Ionicons name="pencil" size={18} color={colors.primaryGreenDark} />
              </View>
              <Text style={styles.exampleTitle}>{content.titulo}</Text>
            </View>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>{content.texto}</Text>
            </View>
            {content.pasos && (
              <View style={styles.stepsWrap}>
                {content.pasos.map((paso, i) => (
                  <View key={i} style={styles.stepRow}>
                    <View style={[styles.stepNumber, { backgroundColor: diffInfo.color }]}>
                      <Text style={styles.stepNumberText}>{i + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{paso}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      case "formula":
        return (
          <View style={[styles.contentCard, styles.formulaCard]}>
            <View style={styles.formulaBadge}>
              <Ionicons name="calculator" size={20} color="#2D9CDB" />
              <Text style={styles.formulaLabel}>Fórmula clave</Text>
            </View>
            <View style={styles.formulaBox}>
              <Text style={styles.formulaText}>{content.formula}</Text>
            </View>
            {content.descripcion && (
              <Text style={styles.formulaDesc}>{content.descripcion}</Text>
            )}
          </View>
        );
      case "tabla":
        return (
          <View style={styles.contentCard}>
            <View style={styles.tableHeader}>
              <Ionicons name="grid" size={18} color={colors.primaryGreenDark} />
              <Text style={styles.tableTitle}>{content.titulo}</Text>
            </View>
            {content.fila.map((fila, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
                <Text style={styles.tableCell}>{fila[0]}</Text>
                <Text style={[styles.tableCell, styles.tableCellBold]}>= {fila[1]}</Text>
              </View>
            ))}
          </View>
        );
      case "resumen":
        return (
          <View style={[styles.contentCard, styles.resumenCard]}>
            <View style={styles.resumenBadge}>
              <Ionicons name="checkmark-done" size={20} color={colors.primaryGreenDark} />
              <Text style={styles.resumenLabel}>Resumen de la lección</Text>
            </View>
            {content.items.map((item, i) => (
              <View key={i} style={styles.resumenItem}>
                <Ionicons name="checkmark-circle" size={16} color={colors.primaryGreen} />
                <Text style={styles.resumenText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      case "tip":
        return (
          <View style={[styles.contentCard, styles.tipCard]}>
            <View style={styles.tipHeader}>
              <Ionicons name="flash" size={20} color="#FF9800" />
              <Text style={styles.tipLabel}>Consejo</Text>
            </View>
            <Text style={styles.tipText}>{content.texto}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle"
              size={46}
              color={colors.textsuccess}
            />
          </Pressable>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{topic?.name}</Text>
            <View style={[styles.diffBadge, { backgroundColor: diffInfo.color + "22" }]}>
              <Text style={[styles.diffText, { color: diffInfo.color }]}>
                {diffInfo.emoji} {diffInfo.label}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.lessonTitle}>{lesson.titulo}</Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentStep + 1) / totalSteps) * 100}%`,
                backgroundColor: diffInfo.color,
              },
            ]}
          />
        </View>
        <View style={styles.stepDots}>
          {lesson.contenido.map((_, i) => (
            <View
              key={i}
              style={[
                styles.stepDot,
                {
                  backgroundColor: i <= currentStep ? diffInfo.color : "#E0E5EA",
                  width: i === currentStep ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: contentScale }],
          }}
        >
          {renderContent()}
        </Animated.View>

        <View style={styles.navRow}>
          {currentStep > 0 ? (
            <Pressable
              style={styles.navButton}
              onPress={() => setCurrentStep((p) => p - 1)}
            >
              <Ionicons name="arrow-back" size={18} color={colors.textDark} />
              <Text style={styles.navButtonText}>Anterior</Text>
            </Pressable>
          ) : (
            <View />
          )}
          {!isLast ? (
            <Pressable
              style={[styles.navButton, styles.navButtonNext]}
              onPress={() => setCurrentStep((p) => p + 1)}
            >
              <Text style={[styles.navButtonText, { color: colors.white }]}>Siguiente</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.white} />
            </Pressable>
          ) : (
            <PillButton
              title="¡Lección completada!"
              onPress={() => navigation.goBack()}
              style={styles.completeButton}
            />
          )}
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerInfo: { flex: 1, marginLeft: 10 },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
  },
  diffBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
  },
  diffText: { fontSize: 12, fontWeight: "700" },
  lessonTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
    fontFamily: "Poppins_900Black",
  },
  progressTrack: {
    height: 5,
    backgroundColor: "#E5E9F0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: { height: "100%", borderRadius: 3 },
  stepDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
  },
  stepDot: {
    height: 8,
    borderRadius: 4,
    transition: "all 0.3s",
  },
  contentCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  introCard: {
    backgroundColor: "#F0F7FF",
    borderLeftWidth: 4,
    borderLeftColor: colors.textBlue,
  },
  introRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  smallMascot: { width: 70, height: 70, marginRight: 12 },
  introTextWrap: { flex: 1 },
  introLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textBlue,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  introText: { fontSize: 14, color: colors.textDark, lineHeight: 22 },
  conceptBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  conceptIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  conceptTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
  },
  conceptText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 22,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingLeft: 12,
  },
  subDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  subItemText: {
    fontSize: 13,
    color: colors.textDark,
    flex: 1,
    lineHeight: 19,
  },
  exampleCard: {
    backgroundColor: "#F0FAF0",
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryGreen,
  },
  exampleBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  exampleIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryGreenDark,
  },
  exampleBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  exampleText: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 22,
    fontWeight: "500",
  },
  stepsWrap: { marginTop: 4 },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.white,
  },
  stepText: {
    fontSize: 13,
    color: colors.textDark,
    flex: 1,
    lineHeight: 19,
  },
  formulaCard: {
    backgroundColor: "#EBF5FF",
    borderLeftWidth: 4,
    borderLeftColor: "#2D9CDB",
  },
  formulaBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  formulaLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D9CDB",
    marginLeft: 8,
  },
  formulaBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  formulaText: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textDark,
    letterSpacing: 1,
  },
  formulaDesc: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 19,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
    marginLeft: 8,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F3F7",
  },
  tableRowAlt: { backgroundColor: "#F8FAFB" },
  tableCell: {
    fontSize: 14,
    color: colors.textMuted,
  },
  tableCellBold: {
    fontWeight: "700",
    color: colors.textDark,
  },
  resumenCard: {
    backgroundColor: "#F0FAF0",
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryGreen,
  },
  resumenBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  resumenLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryGreenDark,
    marginLeft: 8,
  },
  resumenItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  resumenText: {
    fontSize: 14,
    color: colors.textDark,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: "#FFF8E1",
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FF9800",
    marginLeft: 8,
  },
  tipText: { fontSize: 14, color: colors.textDark, lineHeight: 21 },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: "#E5E9F0",
  },
  navButtonNext: {
    backgroundColor: colors.primaryGreen,
    borderWidth: 0,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textDark,
    marginHorizontal: 6,
  },
  completeButton: { flex: 1 },
});
