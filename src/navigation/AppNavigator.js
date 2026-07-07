import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import ProgressScreen from '../screens/ProgressScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TopicsScreen from '../screens/TopicsScreen';
import TopicInfoScreen from '../screens/TopicInfoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Topics" component={TopicsScreen} />
        <Stack.Screen name="TopicInfo" component={TopicInfoScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Este archivo define la navegación principal de la aplicación utilizando React Navigation. Se crea un stack navigator que contiene todas las pantallas de la aplicación, incluyendo la pantalla de bienvenida, inicio de sesión, registro, pantalla principal con pestañas, cuestionario, resultados, progreso, temas y detalles del tema. La navegación se maneja a través del componente NavigationContainer y cada pantalla se define como un Stack.Screen con su respectivo nombre y componente asociado.
