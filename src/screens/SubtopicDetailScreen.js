import React, { useEffect, useRef } from "react";
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
import { topicsByCourse, difficultyLevels } from "../theme/curriculum";
import mockTopicInfo from "../theme/mockTopicInfo";
import colors from "../theme/colors";

const SECTIONS = [
  { key: "lecciones", label: "Lecciones", icon: "book-outline", mode: "lesson" },
  { key: "cuestionarios", label: "Cuestionarios", icon: "help-circle-outline", mode: "quiz" },
];

function SectionCard({ section, sIdx, onDifficulty }) {
  const sectionDelay = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(sectionDelay, {
      toValue: 1,
      friction: 6,
      tension: 50,
      delay: 200 + sIdx * 150,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.sectionCard,
        {
          opacity: sectionDelay,
          transform: [
            {
              translateY: sectionDelay.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Ionicons
          name={section.icon}
          size={22}
          color={colors.primaryGreenDark}
        />
        <Text style={styles.sectionTitle}>{section.label}</Text>
      </View>

      {difficultyLevels.map((diff) => (
        <Pressable
          key={diff.id}
          style={({ pressed }) => [
            styles.difficultyRow,
            { borderColor: diff.color },
            pressed && styles.difficultyPressed,
          ]}
          onPress={() => onDifficulty(diff.id, section.mode)}
        >
          <View
            style={[styles.difficultyDot, { backgroundColor: diff.color }]}
          />
          <View style={styles.difficultyInfo}>
            <Text style={styles.difficultyLabel}>{diff.label}</Text>
            <Text style={styles.difficultySub}>
              {section.mode === "lesson"
                ? "Lección interactiva"
                : "5 preguntas"}
            </Text>
          </View>
          <Text style={styles.difficultyEmoji}>{diff.emoji}</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textMuted}
          />
        </Pressable>
      ))}
    </Animated.View>
  );
}

export default function SubtopicDetailScreen({ route, navigation }) {
  const { courseId, topicId } = route.params;
  const topic = (topicsByCourse[courseId] || []).find((t) => t.id === topicId);
  const info = mockTopicInfo[topicId] || mockTopicInfo.default;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDifficulty = (difficultyId, mode) => {
    if (mode === "quiz") {
      navigation.navigate("Quiz", {
        courseId,
        topicId,
        difficulty: difficultyId,
      });
    } else {
      navigation.navigate("Lesson", {
        courseId,
        topicId,
        difficulty: difficultyId,
      });
    }
  };

  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back-circle"
            size={50}
            color={colors.textsuccess}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.headerSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>{topic?.emoji}</Text>
          </View>
          <Text style={styles.title}>{topic?.name}</Text>
          <Text style={styles.description}>{info.descripcion}</Text>
        </Animated.View>

        <Image
          source={require("../../assets/Mascota.png")}
          style={styles.mascot}
          resizeMode="contain"
        />

        {SECTIONS.map((section, sIdx) => (
          <SectionCard
            key={section.key}
            section={section}
            sIdx={sIdx}
            onDifficulty={handleDifficulty}
          />
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Temas que verás:</Text>
          {info.temas.map((t) => (
            <View key={t} style={styles.topicItem}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={colors.primaryGreen}
              />
              <Text style={styles.topicText}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  backButton: { marginBottom: 10 },
  headerSection: { alignItems: "center", marginBottom: 10 },
  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primaryGreenLight || "#E3F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  headerEmoji: { fontSize: 34 },
  title: {
    fontSize: 28,
    fontWeight: "200",
    color: colors.textDark,
    textAlign: "center",
    fontFamily: "Poppins_900Black",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: 10,
  },
  mascot: { width: 120, height: 120, alignSelf: "center", marginBottom: 10 },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textDark,
    marginLeft: 8,
  },
  difficultyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderLeftWidth: 4,
  },
  difficultyPressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  difficultyDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  difficultyInfo: { flex: 1 },
  difficultyLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },
  difficultySub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  difficultyEmoji: { fontSize: 16, marginRight: 8 },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 10,
  },
  topicItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  topicText: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: 8,
    flex: 1,
  },
});
