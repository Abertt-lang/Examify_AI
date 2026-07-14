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

  const handleTopicPress = (topicId) => {
    if (courseId === "matematicas") {
      navigation.navigate("SubtopicDetail", { courseId, topicId });
    } else {
      navigation.navigate("TopicInfo", { courseId, topicId });
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
          <Ionicons name="arrow-back-circle" size={50} color={colors.textsuccess} />
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
            onPress={() => handleTopicPress(topic.id)}
          />
        ))}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  headerIcon: {
    width: 70,
    height: 76,
    borderRadius: 16,
    backgroundColor: colors.primaryGreenLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    alignSelf: "center",
  },
  headerEmoji: { fontSize: 60, textAlign: "center" },
  title: {
    fontSize: 35,
    fontWeight: "200",
    color: colors.TextDark,
    textAlign: "center",
    fontFamily: "Poppins_900Black",
    marginBottom: 1.2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 25,
    textAlign: "center",
  },
  backButton: {
    marginBottom: 3,
  },
});
