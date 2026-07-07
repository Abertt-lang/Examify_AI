import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Background from '../components/Background';
import ProfileHeader from '../components/ProfileHeader';
import ProfileCard from '../components/ProfileCard';
import StatCard from '../components/StatCard';
import AchievementBadge from '../components/AchievementBadge';
import ActivityRow from '../components/ActivityRow';
import SettingsRow from '../components/SettingsRow';
import mockProfile from '../theme/mockProfile';
import colors from '../theme/colors';

export default function ProfileScreen({ navigation }) {
  return (
    <Background>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <ProfileHeader />

        <ProfileCard
          nombre={mockProfile.nombre}
          correo={mockProfile.correo}
          miembroDesde={mockProfile.miembroDesde}
          nivel={mockProfile.nivel}
          xpActual={mockProfile.xpActual}
          xpSiguienteNivel={mockProfile.xpSiguienteNivel}
        />

        <View style={styles.statsRow}>
          <StatCard
            emoji="📖"
            value={mockProfile.leccionesCompletadas}
            label={'Lecciones\ncompletadas'}
            bg="#E3F5E9"
            iconBg="#B8E6C8"
          />
          <StatCard
            emoji="🎯"
            value={`${mockProfile.progresoTotal}%`}
            label={'Progreso\ntotal'}
            bg="#E4EEFB"
            iconBg="#BBD6F5"
          />
          <StatCard
            emoji="🔥"
            value={mockProfile.rachaActual}
            label={'Días de racha\nactual'}
            bg="#EDE7FB"
            iconBg="#D2C4F5"
          />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Logros recientes</Text>
            <Text style={styles.seeAll}>Ver todos ›</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockProfile.logros.map((logro) => (
              <AchievementBadge
                key={logro.id}
                emoji={logro.emoji}
                color={logro.color}
                title={logro.title}
                subtitle={logro.subtitle}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Actividad reciente</Text>
            <Text style={styles.seeAll}>Ver todo ›</Text>
          </View>
          {mockProfile.actividad.map((item) => (
            <ActivityRow
              key={item.id}
              emoji={item.emoji}
              text={item.text}
              fecha={item.fecha}
              xp={item.xp}
            />
          ))}
        </View>

        <View style={styles.sectionCard}>
          <SettingsRow
            icon="settings-outline"
            iconColor="#4A90D9"
            iconBg="#E4EEFB"
            title="Configuración"
            subtitle="Notificaciones, privacidad y más"
            onPress={() => {}}
          />
          <SettingsRow
            icon="log-out-outline"
            iconColor="#E05B5B"
            iconBg="#FBE6E6"
            title="Cerrar sesión"
            subtitle="Salir de tu cuenta"
            onPress={() => navigation.getParent()?.navigate('Login')}
          />
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 40 },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.textDark },
  seeAll: { fontSize: 13, fontWeight: '600', color: colors.primaryGreenDark },
});