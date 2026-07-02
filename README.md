# Examify AI — proyecto base (React Native + Expo)

## 1. Crear el proyecto base (una sola vez)

```bash
npx create-expo-app examify-ai
cd examify-ai
```

Luego reemplaza el `App.js` y la carpeta `src/` generadas por las que te
acabo de pasar (copia y pega todo el contenido de este paquete dentro de tu
carpeta `examify-ai`).

## 2. Instalar las librerías que usamos

```bash
npx expo install expo-linear-gradient react-native-svg
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npm install firebase
```

Usamos `npx expo install` (no `npm install`) para esas porque Expo se
encarga de elegir la versión exacta compatible con tu SDK. Para Firebase sí
usamos `npm install` normal porque es una librería independiente de Expo.

## 3. Correr el proyecto

```bash
npx expo start
```

Te va a salir un código QR. Instala la app **Expo Go** en tu celular (Play
Store) y escanéalo — ahí verás la app corriendo en vivo mientras programamos,
sin necesidad de compilar un APK todavía.

## 4. Qué ya está armado

- `src/theme/colors.js` — paleta de colores centralizada
- `src/components/Background.js` — el fondo degradado con hojas y destellos
  en SVG (igual estilo que tu mockup, pero 100% código, sin imágenes)
- `src/components/PillButton.js` — el botón verde tipo píldora reutilizable
- `src/screens/LoginScreen.js` — pantalla completa y estilizada, de
  referencia para el resto
- Las demás pantallas (Register, Home, Quiz, Result, Progress) están como
  placeholders navegables — las vamos llenando una por una
- `src/navigation/AppNavigator.js` — conecta todas las pantallas

## 5. Próximo paso

Cuando lo tengas corriendo, seguimos con Firebase (cuenta, monedas,
progreso) y después con las Cloud Functions para Gemini.
