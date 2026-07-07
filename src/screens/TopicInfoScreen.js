import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Background from "../components/Background";
import PillButton from "../components/PillButton";
import MiniStat from "../components/MiniStat";
import CheckListItem from "../components/CheckListItem";
import { topicsByCourse } from "../theme/curriculum";
import mockTopicInfo from "../theme/mockTopicInfo";
import colors from "../theme/colors";

export default function TopicInfoScreen({ route, navigation }) {
  const { courseId, topicId } = route.params;
  const topic = (topicsByCourse[courseId] || []).find((t) => t.id === topicId);
  const info = mockTopicInfo[topicId] || mockTopicInfo.default;

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
          <Text style={styles.headerEmoji}>{topic?.emoji}</Text>
        </View>

        <Text style={styles.title}>{topic?.name}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre este tema</Text>
          <Text style={styles.description}>{info.descripcion}</Text>

          <View style={styles.statsRow}>
            <MiniStat value={info.lecciones} label={"Lecciones"} />
            <MiniStat
              value={info.preguntasEstimadas}
              label={"Preguntas\nestimadas"}
            />
            <MiniStat value={info.nivel} label={"Nivel"} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Temas que verás:</Text>
          {info.temas.map((t) => (
            <CheckListItem key={t} text={t} />
          ))}
        </View>

        <Image
          source={require("../../assets/Mascota.png")}
          style={styles.mascot}
          resizeMode="contain"
        />

        <PillButton
          title="Comenzar cuestionario"
          onPress={() =>
            navigation.navigate("Quiz", { courseId, topicId })
          }
        />
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
    borderRadius: 28,
    backgroundColor: colors.primaryGreen,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    alignSelf: "center",
  },
  headerEmoji: { fontSize: 26 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 16,
    lineHeight: 19,
  },
  statsRow: { flexDirection: "row" },
  mascot: { width: 140, height: 140, alignSelf: "center", marginBottom: 10 },
});
