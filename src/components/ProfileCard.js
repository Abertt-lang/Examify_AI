import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function ProfileCard({ nombre, correo, miembroDesde, nivel, xpActual, xpSiguienteNivel }) {
  const xpPercent = Math.min(100, (xpActual / xpSiguienteNivel) * 100);

    return (
    <View style={styles.card}>
        <View style={styles.topRow}>
        <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
            <Ionicons name="person" size={36} color={colors.primaryGreenDark} />
            </View>
            <View style={styles.editBadge}>
            <Ionicons name="pencil" size={12} color={colors.white} />
            </View>
        </View>

        <View style={styles.info}>
            <View style={styles.nameRow}>
            <Text style={styles.name}>{nombre}</Text>
            <Ionicons name="pencil" size={14} color={colors.textMuted} style={{ marginLeft: 6 }} />
            </View>
            <Text style={styles.email}>{correo}</Text>
            <View style={styles.memberRow}>
            <Ionicons name="calendar-outline" size={13} color={colors.textMuted} />
            <Text style={styles.memberText}>Miembro desde {miembroDesde}</Text>
            </View>
        </View>
        </View>

        <View style={styles.levelSection}>
        <View style={styles.levelBadge}>
            <Ionicons name="star" size={13} color="#8B5CF6" />
            <Text style={styles.levelText}>Nivel {nivel}</Text>
        </View>

        <View style={styles.xpTrack}>
            <View style={[styles.xpFill, { width: `${xpPercent}%` }]} />
        </View>
        <Text style={styles.xpText}>{xpActual} / {xpSiguienteNivel} XP</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    },
    topRow: { flexDirection: 'row', alignItems: 'center' },
    avatarWrapper: { marginRight: 14 },
    avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#E4EEFB',
    alignItems: 'center',
    justifyContent: 'center',
    },
    editBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    },
    info: { flex: 1 },
    nameRow: { flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: 18, fontWeight: '700', color: colors.textDark },
    email: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
    memberRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    memberText: { fontSize: 12, color: colors.textMuted, marginLeft: 5 },
    levelSection: { marginTop: 18, alignItems: 'flex-end' },
    levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE7FB',
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 10,
    },
    levelText: { fontSize: 12, fontWeight: '700', color: '#8B5CF6', marginLeft: 5 },
    xpTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E9F0',
    borderRadius: 3,
    overflow: 'hidden',
    },
    xpFill: {
    height: '100%',
    backgroundColor: colors.primaryGreen,
    borderRadius: 3,
    },
    xpText: { fontSize: 12, color: colors.primaryGreenDark, fontWeight: '600', marginTop: 6 },
});