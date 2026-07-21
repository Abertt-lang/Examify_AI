import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import ScoreRing from "../components/ScoreRing";
import MiniStat from "../components/MiniStat";
import RewardCard from "../components/RewardCard";
import colors from "../theme/colors";
import { saveQuizResult } from "../services/progress";

function ReviewItem({ item, index }) {
  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  return (
    <View style={reviewStyles.card}>
      <View style={reviewStyles.header}>
        <View
          style={[
            reviewStyles.iconCircle,
            { backgroundColor: item.isCorrect ? "#E3F5E9" : "#FBE6E6" },
          ]}
        >
          <Ionicons
            name={item.isCorrect ? "checkmark" : "close"}
            size={16}
            color={item.isCorrect ? colors.primaryGreenDark : "#E05B5B"}
          />
        </View>
        <Text style={reviewStyles.questionNumber}>Pregunta {index + 1}</Text>
      </View>

      <Text style={reviewStyles.questionText}>{item.question}</Text>

      <View style={reviewStyles.optionsContainer}>
        {item.options.map((opt, i) => {
          const isCorrect = i === item.correctIndex;
          const isSelected = i === item.selectedIndex;
          const wasWrong = isSelected && !isCorrect;

          let bgColor = "#F8FAFB";
          let borderColor = "#E8ECF0";
          let textColor = colors.textMuted;

          if (isCorrect) {
            bgColor = "#E3F5E9";
            borderColor = colors.primaryGreen;
            textColor = colors.primaryGreenDark;
          } else if (wasWrong) {
            bgColor = "#FBE6E6";
            borderColor = "#E05B5B";
            textColor = "#E05B5B";
          }

          return (
            <View
              key={i}
              style={[
                reviewStyles.optionRow,
                { backgroundColor: bgColor, borderColor },
              ]}
            >
              <View
                style={[
                  reviewStyles.letterBadge,
                  {
                    backgroundColor: isCorrect
                      ? colors.primaryGreen
                      : wasWrong
                      ? "#E05B5B"
                      : "#E5E9F0",
                  },
                ]}
              >
                <Text
                  style={[
                    reviewStyles.letterText,
                    {
                      color: isCorrect || wasWrong ? "#fff" : colors.textMuted,
                    },
                  ]}
                >
                  {optionLetters[i]}
                </Text>
              </View>
              <Text
                style={[reviewStyles.optionText, { color: textColor }]}
                numberOfLines={3}
              >
                {opt}
              </Text>
              {isCorrect && (
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={colors.primaryGreenDark}
                />
              )}
              {wasWrong && (
                <Ionicons name="close-circle" size={18} color="#E05B5B" />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function ResultScreen({ route, navigation }) {
  const {
    score = 0,
    total = 1,
    topicName = "",
    difficulty = "",
    courseId,
    topicId,
    answers = [],
  } = route.params || {};

  const percent = Math.round((score / total) * 100);
  const incorrectas = total - score;
  const monedasGanadas = score * 2;
  const xpGanado = score * 10 + (percent >= 80 ? 20 : 0);

  const [saved, setSaved] = useState(false);

  const scale = useRef(new Animated.Value(0)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 60,
      useNativeDriver: true,
    }).start();

    Animated.timing(contentFade, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start();

    if (percent >= 80) {
      setTimeout(() => {
        Animated.spring(badgeScale, {
          toValue: 1,
          friction: 3,
          tension: 80,
          useNativeDriver: true,
        }).start();
      }, 600);
    }

    if (courseId && topicId && !saved) {
      setSaved(true);
      saveQuizResult({
        courseId,
        topicId,
        difficulty,
        score,
        total,
      }).catch(() => {});
    }
  }, []);

  const getMessage = () => {
    if (percent >= 80) return "¡Excelente!";
    if (percent >= 60) return "¡Buen trabajo!";
    if (percent >= 40) return "Vas por buen camino";
    return "Sigue practicando";
  };

  const getMascotImage = () => {
    if (percent >= 80) return require("../../assets/robotbien1.png");
    if (percent >= 50) return require("../../assets/robotbien2.png");
    return require("../../assets/robotfalla1.png");
  };

  const wrongAnswers = answers.filter((a) => !a.isCorrect);

  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Resultados</Text>
        <Text style={styles.subtitle}>{topicName}</Text>
        {difficulty ? (
          <View style={styles.diffBadge}>
            <Text style={styles.diffText}>{difficulty}</Text>
          </View>
        ) : null}

        <Animated.View
          style={[styles.ringWrapper, { transform: [{ scale }] }]}
        >
          <ScoreRing percent={percent} />
        </Animated.View>

        <Text style={styles.message}>{getMessage()}</Text>
        <Text style={styles.detail}>
          {score} de {total} respuestas correctas
        </Text>

        {percent >= 80 && (
          <Animated.View
            style={[
              styles.badge,
              { transform: [{ scale: badgeScale }] },
            ]}
          >
            <Text style={styles.badgeText}>
              🏆 ¡Insignia desbloqueada!
            </Text>
          </Animated.View>
        )}

        <View style={styles.statsRow}>
          <MiniStat value={score} label="Correctas" />
          <MiniStat value={incorrectas} label="Incorrectas" />
          <MiniStat value={total} label="Total" />
        </View>

        <RewardCard monedas={monedasGanadas} xp={xpGanado} />

        <Image
          source={getMascotImage()}
          style={styles.mascot}
          resizeMode="contain"
        />

        <Animated.View style={{ opacity: contentFade, width: "100%" }}>
          {answers.length > 0 && (
            <View style={styles.reviewSection}>
              <View style={styles.reviewHeader}>
                <Ionicons
                  name="book-outline"
                  size={22}
                  color={colors.primaryGreenDark}
                />
                <Text style={styles.reviewTitle}>Lo que aprendiste</Text>
              </View>
              <Text style={styles.reviewSubtitle}>
                Revisa tus respuestas y aprende de los errores
              </Text>

              {answers.map((a, i) => (
                <ReviewItem key={i} item={a} index={i} />
              ))}
            </View>
          )}

          {wrongAnswers.length > 0 && (
            <View style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <Ionicons name="bulb" size={20} color="#FF9800" />
                <Text style={styles.tipTitle}>Consejo</Text>
              </View>
              <Text style={styles.tipText}>
                Tuviste {wrongAnswers.length} respuesta
                {wrongAnswers.length > 1 ? "s" : ""} incorrecta
                {wrongAnswers.length > 1 ? "s" : ""}. Revisa los temas donde
                fallaste y vuelve a intentarlo. ¡La práctica hace al maestro!
              </Text>
            </View>
          )}
        </Animated.View>

        <PillButton
          title="Volver al inicio"
          onPress={() => navigation.navigate("Main")}
        />
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: { fontSize: 26, fontWeight: "700", color: colors.textDark },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 6,
  },
  diffBadge: {
    backgroundColor: colors.primaryGreen + "22",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 20,
  },
  diffText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primaryGreenDark,
  },
  ringWrapper: { marginBottom: 20 },
  message: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryGreenDark,
  },
  detail: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#FFD54F",
  },
  badgeText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F57F17",
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  mascot: { width: 130, height: 130, marginBottom: 20 },
  reviewSection: {
    width: "100%",
    marginBottom: 20,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    marginLeft: 8,
  },
  reviewSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 16,
  },
  tipCard: {
    width: "100%",
    backgroundColor: "#FFF8E1",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FF9800",
    marginLeft: 8,
  },
  tipText: {
    fontSize: 13,
    color: colors.textDark,
    lineHeight: 20,
  },
});

const reviewStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  questionNumber: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
  },
  questionText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 6,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1.5,
  },
  letterBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  letterText: {
    fontSize: 11,
    fontWeight: "800",
  },
  optionText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
});
