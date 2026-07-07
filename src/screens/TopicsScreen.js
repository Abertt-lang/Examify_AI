import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../components/Background";
import TopicRow from "../components/TopicRow";
import { courses, topicsByCourse } from "../theme/curriculum";
import colors from "../theme/colors";

export default function TopicsScreen({ route, navigation }) {
  const { courseId } = route.params;
  const course = courses.find((c) => c.id === courseId);
  const topics = topicsByCourse[courseId] || [];

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
          <Ionicons name="arrow-back" size={22} color={colors.textDark} />
        </Pressable>

        <View style={styles.headerIcon}>
          <Text style={styles.headerEmoji}>{course?.emoji}</Text>
        </View>

        <Text style={styles.title}>{course?.name}</Text>
        <Text style={styles.subtitle}>Elige un tema para practicar</Text>

        {topics.map((topic) => (
          <TopicRow
            key={topic.id}
            emoji={topic.emoji}
            name={topic.name}
            lessons={topic.lessons}
            onPress={() =>
              navigation.navigate("TopicInfo", { courseId, topicId: topic.id })
            }
          />
        ))}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  backButton: { marginBottom: 20 },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    

    headerEmoji: { fontSize: 26 },
  },
  headerEmoji: { fontSize: 26 },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 20,
    textAlign: "center",
  },
});
