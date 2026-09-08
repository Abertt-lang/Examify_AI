# Examify AI

App educativa de cuestionarios y lecciones hecha con **React Native + Expo (SDK 54)**. Genera cuestionarios con IA a partir de archivos (PDF/PDF adjunto o imagen) usando Gemini, autenticación con Firebase y progreso guardado localmente.

## Requisitos

- Node.js (compatible con Expo SDK 54)
- Cuenta de [Firebase](https://console.firebase.google.com/) (Authentication + Firestore)
- API key de [Google AI Studio](https://aistudio.google.com/) (Gemini)

## Configuración

1. Instala las dependencias:

```bash
npm install
```

2. Crea el archivo `.env` copiando el template y completa tus credenciales:

```bash
cp .env.example .env
```

El proyecto usa `EXPO_PUBLIC_*` (variables accesibles desde el bundle cliente):

- `EXPO_PUBLIC_GEMINI_API_KEY` — clave de Gemini
- `EXPO_PUBLIC_FIREBASE_*` — credenciales de tu proyecto Firebase

No expongas el `.env` ni tus claves en el repositorio (ya está en `.gitignore`).

3. Configura Firestore:
   - Crea la colección `users/{userId}` (el doc guarda perfil, nivel y progreso).
   - Publica las reglas con `firebase deploy --only firestore:rules` o desde la consola:
     - Solo el dueño puede leer/escribir su propio doc (`request.auth.uid == userId`).

## Correr la app

```bash
npm start            # Expo dev server
npm run android      # compila y corre en Android (requiere build nativo)
npm run ios          # compila y corre en iOS
npm run web          # versión web
```

> Desde Expo Go puedes correr la mayoría del proyecto, pero las librerías nativas
> (`lottie-react-native`) requieren un build con `npx expo run:android` para tener
> el view manager disponible.

## Scripts de calidad

```bash
npm run lint    # ESLint (config Expo flat, eslint-config-expo)
npm run test    # Jest (preset jest-expo)
```

## Estructura

```
src/
  components/    Componentes reutilizables (fondo, botones, gráficas, badges)
  config/        firebase.js — inicialización de Firebase con variables de entorno
  contexts/      AuthContext — sesión (email/password + Google)
  navigation/    AppNavigator (stack) y MainTabs (Inicio / Progreso / Perfil)
  screens/       Pantallas: Welcome, Login, Register, Home, Topics, SubtopicDetail,
                 Lesson, Quiz, Result, Progress, Profile, GenerateQuiz
  services/      gemini.js (generación de cuestionarios con IA) y progress.js
                 (progreso en AsyncStorage)
  theme/         Colores, curriculum (cursos/tópicos) y contenido de lecciones
```

## Funcionalidades

- **Autenticación**: email/contraseña y Google Sign-In; perfil sincronizado con Firestore.
- **Cuestionarios por tópico**: por dificultad (fácil/medio/difícil), lecciones por tema.
- **Cuestionarios con IA**: sube un PDF o imagen; Gemini genera preguntas y navegas
  directo al resultado con animación de éxito (Lottie).
- **Resultados y progreso**: barra de resultado animada, distribución de respuestas,
  tendencia y estadísticas por curso guardadas localmente (AsyncStorage).