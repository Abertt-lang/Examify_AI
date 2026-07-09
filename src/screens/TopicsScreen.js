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
          <Ionicons name="arrow-back-circle" size={50} color={colors.textsuccess} />//Este es la flecha, el circle es para darle un cirsulo en esta y cmabiarle su tamaño y color
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
    width: 70,//esto adecualo al emoji, no lo vemos pero sigue ahi, es como lo de la disposicones de mitt app inventor
    height: 76,//esto tambien alto y ancho
    borderRadius: 16,//como no lo vemos no se nota pero es el borde del cuadrado que rodea el emoji, se puede cambiar el tamaño del borde y su color
    backgroundColor: colors.primaryGreenLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    alignSelf: "center",
    //alingSelf: "center" es para centrar el emoji de matematicas sobre el titulo, tambien aca ves lo que rodea el emoji, el cuadrado , se puede cambiar el tamaño y la posición del cuadrado , tambein su color
    headerEmoji: { fontSize: 60, }
    
  },
  headerEmoji:
    { fontSize: 60,
      textAlign: "center",
    },
    //Este es el emoji de matematicas sobre el titulo, aqui se puede cambiar el tamaño y la posición del emoji
  title: {
    fontSize: 35,
    fontWeight: "200",
    color: colors.TextDark,
    textAlign: "center",//aca estamos alineando al centro
    fontFamily: "Poppins_900Black",//etsa es la fuente, la importamos en app,js 
    marginBottom: 1.2,
  },
  //Aca podemos cambiar y mover y en general editar el titulo principal Matematicas, se puede cambiar el tamaño, la posición, el color y la fuente del titulo tambien  marginBottom: es para los espacios en vertical entre el titulo y el subtitulo, se puede cambiar el tamaño del espacio entre el titulo y el subtitulo a diferencia de gap que es para los espacios en horizontal entre el titulo y el subtitulo, se puede cambiar el tamaño del espacio entre el titulo y el subtitulo
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 25,
    textAlign: "center",
  },
  //Esto es lo mismo del titulo pero para el subtitulo, se puede cambiar el tamaño, la posición, el color y la fuente del subtitulo
  backButton: {
    marginBottom: 3,//este es el espacio entre el boton de atras y el emoji de matematicas, se puede cambiar el tamaño del espacio entre el boton de atras y el emoji de matematicas
  },
});
