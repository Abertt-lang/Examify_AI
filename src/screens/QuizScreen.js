import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, Pressable, ScrollView, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import mockQuestions from "../theme/mockQuestions";
import { topicsByCourse, difficultyLevels } from "../theme/curriculum";
import colors from "../theme/colors";
import MascotTip from "../components/MascotTip";
import { pickTip } from "../theme/quizTips";

export default function QuizScreen({ route, navigation }) {
  const { courseId, topicId, difficulty = "facil" } = route.params;
  const topic = (topicsByCourse[courseId] || []).find((t) => t.id === topicId);
  const diffInfo = difficultyLevels.find((d) => d.id === difficulty) || difficultyLevels[0];

  const topicQuestions = mockQuestions[topicId];
  const questions =
    topicQuestions?.[difficulty] || topicQuestions?.facil || mockQuestions.default;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [tipMessage, setTipMessage] = useState("");
  const [answeredCorrect, setAnsweredCorrect] = useState(null);

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswered = selectedOption !== null;

  const NUM_OPTIONS = question.options.length;

  const optionAnims = useRef(
    Array.from({ length: NUM_OPTIONS }, () => new Animated.Value(0))
  ).current;

  const questionFade = useRef(new Animated.Value(1)).current;
  const questionSlide = useRef(new Animated.Value(0)).current;
  const correctAnim = useRef(new Animated.Value(0)).current;
  const wrongShake = useRef(new Animated.Value(0)).current;
  const nextButtonFade = useRef(new Animated.Value(0)).current;
  const scorePop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    optionAnims.forEach((a) => a.setValue(0));
    questionFade.setValue(0);
    questionSlide.setValue(20);

    Animated.parallel([
      Animated.timing(questionFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(questionSlide, {
        toValue: 0,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    const staggerAnims = optionAnims.map((anim, i) =>
      Animated.spring(anim, {
        toValue: 1,
        friction: 6,
        tension: 50,
        delay: 150 + i * 100,
        useNativeDriver: true,
      })
    );
    Animated.stagger(0, staggerAnims).start();
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex > 0) {
      nextButtonFade.setValue(0);
      Animated.timing(nextButtonFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentIndex]);

  const handleSelect = (index) => {
    if (hasAnswered) return;

    setSelectedOption(index);
    const correct = index === question.correctIndex;
    setAnsweredCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      scorePop.setValue(0);
      Animated.sequence([
        Animated.spring(correctAnim, {
          toValue: 1,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(correctAnim, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
      Animated.sequence([
        Animated.spring(scorePop, {
          toValue: 1.3,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scorePop, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(wrongShake, { toValue: 12, duration: 40, useNativeDriver: true }),
        Animated.timing(wrongShake, { toValue: -12, duration: 40, useNativeDriver: true }),
        Animated.timing(wrongShake, { toValue: 8, duration: 40, useNativeDriver: true }),
        Animated.timing(wrongShake, { toValue: -8, duration: 40, useNativeDriver: true }),
        Animated.timing(wrongShake, { toValue: 0, duration: 40, useNativeDriver: true }),
      ]).start();
    }

    optionAnims.forEach((anim, i) => {
      if (i !== index && i !== question.correctIndex) {
        Animated.timing(anim, {
          toValue: 0.4,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });

    setTipMessage(pickTip(correct));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      navigation.replace("Result", {
        score: selectedOption === question.correctIndex ? score : score,
        total: questions.length,
        topicName: topic?.name,
        difficulty: diffInfo.label,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnsweredCorrect(null);
    }
  };

  const getOptionAnimStyle = (index) => {
    const anim = optionAnims[index] || new Animated.Value(1);
    return {
      opacity: anim,
      transform: [
        {
          translateX: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [index % 2 === 0 ? -30 : 30, 0],
          }),
        },
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    };
  };

  const getOptionStyle = (index) => {
    if (!hasAnswered) return styles.option;
    if (index === question.correctIndex)
      return [styles.option, styles.optionCorrect];
    if (index === selectedOption) return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDisabled];
  };

  const optionLetters = ["A", "B", "C", "D", "E", "F"];

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
          <View style={[styles.diffBadge, { backgroundColor: diffInfo.color + "22" }]}>
            <Text style={[styles.diffText, { color: diffInfo.color }]}>
              {diffInfo.label}
            </Text>
          </View>
          <Animated.View style={{ transform: [{ scale: scorePop }] }}>
            <Text style={styles.headerCount}>
              {currentIndex + 1}/{questions.length}
            </Text>
          </Animated.View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
                backgroundColor: diffInfo.color,
              },
            ]}
          />
        </View>

        <Animated.View
          style={{
            opacity: questionFade,
            transform: [
              { translateX: wrongShake },
              { translateY: questionSlide },
            ],
          }}
        >
          <View style={styles.questionCard}>
            <Text style={styles.questionNumber}>Pregunta {currentIndex + 1}</Text>
            <Text style={styles.question}>{question.question}</Text>
          </View>
        </Animated.View>

        {question.options.map((option, index) => (
          <Animated.View key={`${currentIndex}-${index}`} style={getOptionAnimStyle(index)}>
            <Pressable
              onPress={() => handleSelect(index)}
              style={getOptionStyle(index)}
            >
              <View style={[styles.optionLetter, { backgroundColor: hasAnswered && index === question.correctIndex ? colors.primaryGreen : hasAnswered && index === selectedOption ? "#E05B5B" : colors.primaryGreen + "15" }]}>
                <Text style={[styles.optionLetterText, { color: hasAnswered && index === question.correctIndex ? colors.white : hasAnswered && index === selectedOption ? colors.white : colors.primaryGreenDark }]}>{optionLetters[index]}</Text>
              </View>
              <Text style={styles.optionText}>{option}</Text>
              {hasAnswered && index === question.correctIndex && (
                <Animated.View
                  style={{
                    transform: [
                      {
                        scale: correctAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.5],
                        }),
                      },
                    ],
                  }}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.primaryGreenDark}
                  />
                </Animated.View>
              )}
              {hasAnswered &&
                index === selectedOption &&
                index !== question.correctIndex && (
                  <Ionicons name="close-circle" size={24} color="#E05B5B" />
                )}
            </Pressable>
          </Animated.View>
        ))}

        {hasAnswered && (
          <MascotTip
            message={tipMessage}
            isCorrect={selectedOption === question.correctIndex}
          />
        )}

        {hasAnswered && (
          <Animated.View style={{ opacity: nextButtonFade }}>
            <PillButton
              title={isLastQuestion ? "Ver resultado" : "Siguiente"}
              onPress={handleNext}
            />
          </Animated.View>
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
  headerTitle: { fontSize: 16, fontWeight: "700", color: colors.textDark, flex: 1, marginLeft: 8 },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  diffText: { fontSize: 11, fontWeight: "700" },
  headerCount: { fontSize: 14, color: colors.textMuted, fontWeight: "700" },
  progressTrack: {
    height: 6,
    backgroundColor: "#E5E9F0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: { height: "100%", borderRadius: 3 },
  questionCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primaryGreen,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  question: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    lineHeight: 26,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E8ECF0",
  },
  optionCorrect: {
    borderColor: colors.primaryGreen,
    backgroundColor: "#E3F5E9",
  },
  optionWrong: { borderColor: "#E05B5B", backgroundColor: "#FBE6E6" },
  optionDisabled: { opacity: 0.45 },
  optionLetter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionLetterText: { fontSize: 14, fontWeight: "800" },
  optionText: { fontSize: 14, color: colors.textDark, fontWeight: "600", flex: 1, lineHeight: 20 },
});
