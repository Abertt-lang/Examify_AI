import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import MainTabs from "./MainTabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";
import ProgressScreen from "../screens/ProgressScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TopicsScreen from "../screens/TopicsScreen";
import TopicInfoScreen from "../screens/TopicInfoScreen";
import SubtopicDetailScreen from "../screens/SubtopicDetailScreen";
import LessonScreen from "../screens/LessonScreen";
import GenerateQuizScreen from "../screens/GenerateQuizScreen";
import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();
  console.log("[NAV] user:", user ? user.uid : null, "loading:", loading);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", background: "#A9CDEE" }}>
        <ActivityIndicator size="large" color="#6FCF57" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Main" : "Welcome"}
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 350,
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ animation: "fade" }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ animation: "slide_from_right" }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ animation: "slide_from_right" }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ animation: "fade" }} />
            <Stack.Screen name="Quiz" component={QuizScreen} options={{ animation: "slide_from_bottom", animationDuration: 400 }} />
            <Stack.Screen name="Result" component={ResultScreen} options={{ animation: "slide_from_center", animationDuration: 500 }} />
            <Stack.Screen name="Progress" component={ProgressScreen} options={{ animation: "slide_from_right" }} />
            <Stack.Screen name="Topics" component={TopicsScreen} options={{ animation: "slide_from_right", animationDuration: 350 }} />
            <Stack.Screen name="TopicInfo" component={TopicInfoScreen} options={{ animation: "slide_from_right" }} />
            <Stack.Screen name="SubtopicDetail" component={SubtopicDetailScreen} options={{ animation: "slide_from_right", animationDuration: 350 }} />
            <Stack.Screen name="Lesson" component={LessonScreen} options={{ animation: "slide_from_bottom", animationDuration: 400 }} />
            <Stack.Screen name="GenerateQuiz" component={GenerateQuizScreen} options={{ animation: "slide_from_right" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
