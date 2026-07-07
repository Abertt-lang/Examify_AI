import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import mockQuestions from "../theme/mockQuestions";
import { topicsByCourse } from "../theme/curriculum";
import colors from "../theme/colors";
import MascotTip from "../components/MascotTip";
import { pickTip } from "../theme/quizTips";

export default function QuizScreen({ route, navigation }) {
  const { courseId, topicId } = route.params;
  const topic = (topicsByCourse[courseId] || []).find((t) => t.id === topicId);
  const questions = mockQuestions[topicId] || mockQuestions.default;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [tipMessage, setTipMessage] = useState("");

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswered = selectedOption !== null;

  const handleSelect = (index) => {
    if (hasAnswered) return; // evita cambiar la respuesta después de elegir

    setSelectedOption(index);
    const correct = index === question.correctIndex;
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setTipMessage(pickTip(correct));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      navigation.replace("Result", {
        score: selectedOption === question.correctIndex ? score : score,
        total: questions.length,
        topicName: topic?.name,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const getOptionStyle = (index) => {
    if (!hasAnswered) return styles.option;
    if (index === question.correctIndex)
      return [styles.option, styles.optionCorrect];
    if (index === selectedOption) return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDisabled];
  };

  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.textDark} />
          </Pressable>
          <Text style={styles.headerTitle}>{topic?.name}</Text>
          <Text style={styles.headerCount}>
            {currentIndex + 1} de {questions.length}
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.question}>{question.question}</Text>

        {question.options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => handleSelect(index)}
            style={getOptionStyle(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
            {hasAnswered && index === question.correctIndex && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.primaryGreenDark}
              />
            )}
            {hasAnswered &&
              index === selectedOption &&
              index !== question.correctIndex && (
                <Ionicons name="close-circle" size={20} color="#E05B5B" />
              )}
          </Pressable>
        ))}

        {hasAnswered && (
          <MascotTip message={tipMessage} isCorrect={selectedOption === question.correctIndex} />
        )}
        {hasAnswered && (
          <PillButton
            title={isLastQuestion ? "Ver resultado" : "Siguiente"}
            onPress={handleNext}
          />
        )}
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
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 16, fontWeight: "700", color: colors.textDark },
  headerCount: { fontSize: 13, color: colors.textMuted },
  progressTrack: {
    height: 6,
    backgroundColor: "#E5E9F0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 24,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primaryGreen,
    borderRadius: 3,
  },
  question: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionCorrect: {
    borderColor: colors.primaryGreen,
    backgroundColor: "#E3F5E9",
  },
  optionWrong: { borderColor: "#E05B5B", backgroundColor: "#FBE6E6" },
  optionDisabled: { opacity: 0.6 },
  optionText: { fontSize: 14, color: colors.textDark, fontWeight: "600" },
});
