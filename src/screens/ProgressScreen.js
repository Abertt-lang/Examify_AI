import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Background from "../components/Background";
import ProgressHeader from "../components/ProgressHeader";
import StatCard from "../components/StatCard";
import CourseProgressRow from "../components/CourseProgressRow";
import colors from "../theme/colors";
import { courses, topicsByCourse } from "../theme/curriculum";
import { getAllStats, getCourseStats, getDifficultyStats } from "../services/progress";

function TopicProgressItem({ topic, courseId, stats, expanded, onToggle }) {
  const topicStats = stats?.topicStats?.[topic.id];
  const bestPct = topicStats?.best || 0;
  const quizzesTaken = topicStats?.quizzesTaken || 0;

  return (
    <View style={styles.topicItem}>
      <Pressable style={styles.topicRow} onPress={onToggle}>
        <Text style={styles.topicEmoji}>{topic.emoji}</Text>
        <View style={styles.topicInfo}>
          <Text style={styles.topicName}>{topic.name}</Text>
          <View style={styles.miniBar}>
            <View
              style={[
                styles.miniBarFill,
                {
                  width: `${bestPct}%`,
                  backgroundColor:
                    bestPct >= 80
                      ? colors.primaryGreen
                      : bestPct >= 50
                      ? "#FF9800"
                      : bestPct > 0
                      ? "#F44336"
                      : "#E5E9F0",
                },
              ]}
            />
          </View>
        </View>
        <Text style={[styles.topicPercent, { color: bestPct >= 80 ? colors.primaryGreenDark : colors.textDark }]}>
          {bestPct > 0 ? `${bestPct}%` : "—"}
        </Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.textMuted}
        />
      </Pressable>

      {expanded && (
        <View style={styles.difficultySection}>
          {["facil", "medio", "dificil"].map((d) => (
            <DifficultyRow key={d} courseId={courseId} topicId={topic.id} difficulty={d} />
          ))}
        </View>
      )}
    </View>
  );
}

function DifficultyRow({ courseId, topicId, difficulty }) {
  const [data, setData] = useState({ taken: false, best: 0, attempts: 0 });
  const labels = { facil: "⭐ Fácil", medio: "⭐⭐ Medio", dificil: "⭐⭐⭐ Difícil" };

  useEffect(() => {
    getDifficultyStats(courseId, topicId).then((s) => setData(s[difficulty]));
  }, [courseId, topicId, difficulty]);

  return (
    <View style={styles.diffRow}>
      <Text style={styles.diffLabel}>{labels[difficulty]}</Text>
      {data.taken ? (
        <View style={styles.diffResult}>
          <Text style={styles.diffBest}>{data.best}%</Text>
          <Text style={styles.diffAttempts}>{data.attempts} intento{data.attempts > 1 ? "s" : ""}</Text>
        </View>
      ) : (
        <Text style={styles.diffNoData}>Sin intentos</Text>
      )}
    </View>
  );
}

function CourseExpanded({ courseId }) {
  const [stats, setStats] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const topics = topicsByCourse[courseId] || [];

  useEffect(() => {
    getCourseStats(courseId).then(setStats);
  }, [courseId]);

  return (
    <View style={styles.expandedContainer}>
      {topics.map((topic) => (
        <TopicProgressItem
          key={topic.id}
          topic={topic}
          courseId={courseId}
          stats={stats}
          expanded={expandedTopic === topic.id}
          onToggle={() =>
            setExpandedTopic(expandedTopic === topic.id ? null : topic.id)
          }
        />
      ))}
    </View>
  );
}

export default function ProgressScreen() {
  const [allStats, setAllStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState(null);

  const loadStats = useCallback(async () => {
    setLoading(true);
    const stats = await getAllStats();
    setAllStats(stats);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [loadStats])
  );

  if (loading) {
    return (
      <Background>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryGreen} />
        </View>
      </Background>
    );
  }

  const totalQuizzes = allStats?.totalQuizzes || 0;
  const totalLessons = allStats?.totalLessons || 0;
  const avgScore = allStats?.avgScore || 0;
  const coursesWithProgress = allStats?.courseIds?.length || 0;

  const courseRows = courses.map((c) => {
    const courseStats = allStats?.courses?.[c.id];
    const topics = topicsByCourse[c.id] || [];
    const topicCount = topics.length;
    const topicWithScore = topics.filter((t) => {
      const ts = courseStats?.topicStats?.[t.id];
      return ts && ts.best > 0;
    }).length;
    const percent =
      topicCount > 0 ? Math.round((topicWithScore / topicCount) * 100) : 0;

    return { ...c, percent, hasData: courseStats != null };
  });

  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <ProgressHeader />

        <View style={styles.statsRow}>
          <StatCard
            emoji="📋"
            value={totalQuizzes}
            label={"Cuestionarios\nresueltos"}
            bg="#E4EEFB"
            iconBg="#BBD6F5"
          />
          <StatCard
            emoji="🏆"
            value={totalLessons}
            label={"Lecciones\ncompletadas"}
            bg="#E3F5E9"
            iconBg="#B8E6C8"
          />
          <StatCard
            emoji="🎯"
            value={`${avgScore}%`}
            label={"Promedio\ngeneral"}
            bg="#EDE7FB"
            iconBg="#D2C4F5"
          />
        </View>

        <Text style={styles.sectionTitle}>Progreso por curso</Text>

        {courseRows.map((curso) => (
          <View key={curso.id}>
            <Pressable
              onPress={() =>
                setExpandedCourse(expandedCourse === curso.id ? null : curso.id)
              }
            >
              <CourseProgressRow
                emoji={curso.emoji}
                name={curso.name}
                percent={curso.percent}
              />
            </Pressable>
            {expandedCourse === curso.id && (
              <CourseExpanded courseId={curso.id} />
            )}
          </View>
        ))}

        {totalQuizzes === 0 && (
          <View style={styles.emptyCard}>
            <Ionicons name="school-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Aún no hay progreso</Text>
            <Text style={styles.emptyText}>
              Resuelve tu primer cuestionario para ver tu progreso aquí
            </Text>
          </View>
        )}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  expandedContainer: {
    backgroundColor: "#F8FAFB",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  topicItem: {
    marginBottom: 6,
  },
  topicRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  topicEmoji: { fontSize: 18, marginRight: 10 },
  topicInfo: { flex: 1 },
  topicName: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 4,
  },
  miniBar: {
    height: 4,
    backgroundColor: "#E5E9F0",
    borderRadius: 2,
    overflow: "hidden",
  },
  miniBarFill: { height: "100%", borderRadius: 2 },
  topicPercent: {
    fontSize: 13,
    fontWeight: "700",
    marginRight: 6,
    minWidth: 36,
    textAlign: "right",
  },
  difficultySection: {
    paddingLeft: 28,
    paddingBottom: 4,
  },
  diffRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  diffLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  diffResult: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  diffBest: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primaryGreenDark,
  },
  diffAttempts: {
    fontSize: 11,
    color: colors.textMuted,
  },
  diffNoData: {
    fontSize: 11,
    color: colors.placeholder,
    fontStyle: "italic",
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
});
