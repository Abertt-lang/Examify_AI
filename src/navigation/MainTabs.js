import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, Animated, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from '../theme/colors';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_ORDER = ['Inicio', 'Progreso', 'Perfil'];
const TAB_CENTER_FRACTIONS = [1 / 6, 1 / 2, 5 / 6];

const TAB_ICONS = {
    Inicio: require('../../assets/Inicio.png'),
    Progreso: require('../../assets/Progreso.png'),
    Perfil: require('../../assets/Perfil.png'),
};

const BAR_HEIGHT = 44;//Este es el alto de la barra de navegación inferior.
const ICON_SIZE = 26;//Este es el tamaño de los iconos en la barra de navegación inferior.
const PILL_WIDTH = 100;//Este es el ancho de la pastilla que se mueve debajo del icono seleccionado en la barra de navegación inferior.
const PILL_HEIGHT = 35;//Este es el alto de la pastilla que se mueve debajo del icono seleccionado en la barra de navegación inferior.
const LABEL_GAP = 8;
const LABEL_LINE = 16;//Esta funcion es la que renderiza la barra de navegación inferior personalizada y el componente MainTabs que contiene las pantallas de la aplicación.

function CustomTabBar({ state, navigation }) {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const barHeight = BAR_HEIGHT + insets.bottom;
    const pillAnim = useRef(new Animated.Value(state.index)).current;

    const tabIndex = state.index;

    useEffect(() => {
        Animated.timing(pillAnim, {
            toValue: tabIndex,
            duration: 240,
            useNativeDriver: true,
        }).start();
    }, [tabIndex, pillAnim]);

    const onPress = useCallback((route, index) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });
        if (state.index !== index && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    }, [navigation, state.index]);

    const pillTranslateX = pillAnim.interpolate({
        inputRange: TAB_ORDER.map((_, i) => i),
        outputRange: TAB_CENTER_FRACTIONS.map((f) => -PILL_WIDTH / 2 + f * width),
    });

    const pillTop = Math.round((BAR_HEIGHT - PILL_HEIGHT) / 2);
    const iconTop = Math.round((BAR_HEIGHT - ICON_SIZE) / 2);

    return (
        <View style={{ height: barHeight, width: '100%', backgroundColor: colors.primaryGreen, overflow: 'hidden' }}>
            <Animated.View
                style={{
                    position: 'absolute',
                    top: pillTop,
                    left: 0,
                    width: PILL_WIDTH,
                    height: PILL_HEIGHT,
                    borderRadius: PILL_HEIGHT / 2,
                    backgroundColor: '#FFFFFF',
                    transform: [{ translateX: pillTranslateX }],
                }}
            />
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const centerFraction = TAB_CENTER_FRACTIONS[index];
                return (
                    <Pressable
                        key={route.key}
                        onPress={() => onPress(route, index)}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={`${route.name}, tab`}
                        style={{
                            position: 'absolute',
                            left: `${(centerFraction - 1 / 6) * 100}%`,
                            width: `${(1 / 3) * 100}%`,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                        }}
                    >
                        {({ pressed }) => (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: iconTop,
                                    left: 0,
                                    right: 0,
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={TAB_ICONS[route.name]}
                                    style={{
                                        width: ICON_SIZE,
                                        height: ICON_SIZE,
                                        opacity: pressed ? 0.7 : 1,
                                    }}
                                    resizeMode="contain"
                                />
                                <Text
                                    style={{
                                        marginTop: LABEL_GAP,
                                        fontSize: 16,
                                        lineHeight: LABEL_LINE,
                                        fontWeight: isFocused ? '700' : '500',
                                        color: isFocused ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
                                        opacity: pressed ? 0.7 : 1,
                                    }}
                                >
                                    {route.name}
                                </Text>
                            </View>
                        )}
                    </Pressable>
                );
            })}
        </View>
    );
}

export default function MainTabs() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Inicio" component={HomeScreen} />
            <Tab.Screen name="Progreso" component={ProgressScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}