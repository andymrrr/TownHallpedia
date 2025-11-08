import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { HeroeDetailData } from '../interfaces';

interface HeroeDetailDesbloqueosProps {
  data: HeroeDetailData;
}

export const HeroeDetailDesbloqueos: React.FC<HeroeDetailDesbloqueosProps> = ({ data }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const handleAyuntamientoPress = (nivel: number) => {
    router.push(`/ayuntamientos/${nivel}`);
  };

  if (data.desbloqueos.length === 0) {
    return (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.emptyContainer}>
          <FontAwesome name="info-circle" size={48} color={colors.text + '66'} />
          <Text style={[styles.emptyText, { color: colors.text + '99' }]}>
            Este héroe no tiene desbloqueos registrados
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.section, { backgroundColor: colors.card }]}>
      <View style={styles.sectionHeader}>
        <FontAwesome name="unlock" size={18} color={colors.tint} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Desbloqueos por Ayuntamiento
        </Text>
      </View>

      <View style={styles.desbloqueosList}>
        {data.desbloqueos.map((desbloqueo, index) => (
          <Pressable
            key={index}
            onPress={() => handleAyuntamientoPress(desbloqueo.nivel)}
            style={({ pressed }) => [
              styles.desbloqueoCard,
              {
                backgroundColor: colors.background,
                borderColor: colors.cardBorder,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <View style={styles.desbloqueoHeader}>
              <View style={[styles.levelBadge, { backgroundColor: colors.tint + '20' }]}>
                <FontAwesome name="home" size={16} color={colors.tint} />
                <Text style={[styles.levelText, { color: colors.tint }]}>
                  TH {desbloqueo.nivel}
                </Text>
              </View>
              {desbloqueo.esNuevo && (
                <View style={[styles.newBadge, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.newBadgeText}>NUEVO</Text>
                </View>
              )}
            </View>

            <View style={styles.nivelesContainer}>
              <View style={styles.nivelItem}>
                <FontAwesome name="arrow-down" size={12} color={colors.text + '99'} />
                <Text style={[styles.nivelLabel, { color: colors.text + '99' }]}>Nivel Mín:</Text>
                <Text style={[styles.nivelValue, { color: colors.text }]}>
                  {desbloqueo.nivelMinimoDisponible}
                </Text>
              </View>
              <View style={styles.nivelItem}>
                <FontAwesome name="arrow-up" size={12} color={colors.text + '99'} />
                <Text style={[styles.nivelLabel, { color: colors.text + '99' }]}>Nivel Máx:</Text>
                <Text style={[styles.nivelValue, { color: colors.text }]}>
                  {desbloqueo.nivelMaximoDisponible}
                </Text>
              </View>
            </View>

            <View style={styles.arrowContainer}>
              <FontAwesome name="chevron-right" size={14} color={colors.text + '66'} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
  desbloqueosList: {
    gap: 12,
  },
  desbloqueoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desbloqueoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  nivelesContainer: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 12,
  },
  nivelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nivelLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  nivelValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  arrowContainer: {
    marginLeft: 12,
  },
});

