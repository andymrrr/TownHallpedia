import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ImageWithFallback } from '@/components/common';
import { EntityType } from '@/utils/images';
import { HeroeDetailData } from '../interfaces';
import { formatNumber, getRoleColor, getHeroGradient } from '../../listar/components/HeroCard/utils';

interface HeroeDetailInfoProps {
  data: HeroeDetailData;
}

export const HeroeDetailInfo: React.FC<HeroeDetailInfoProps> = ({ data }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const defaultRol = data.rol || 'Soporte';
  const roleColor = getRoleColor(defaultRol);
  const gradientColors = getHeroGradient(roleColor, colorScheme);

  return (
    <>
      {/* Hero Image Section */}
      <View style={[styles.heroSection, { backgroundColor: colors.card }]}>
        <View style={[styles.imageWrapper, { backgroundColor: gradientColors[0] + '15' }]}>
          <ImageWithFallback
            imageUrl={data.imagenUrl}
            entityType={EntityType.HEROE}
            style={styles.heroImage}
            placeholderIconColor={roleColor}
            placeholderBackgroundColor={gradientColors[0] + '30'}
            placeholderIconSize={120}
          />
          <View style={[styles.roleBadge, { backgroundColor: roleColor }]}>
            <Text style={styles.roleText}>{defaultRol}</Text>
          </View>
        </View>
        <Text style={[styles.heroName, { color: colors.text }]}>{data.nombre}</Text>
        {data.descripcion && (
          <Text style={[styles.description, { color: colors.text + 'CC' }]}>
            {data.descripcion}
          </Text>
        )}
      </View>

      {/* Stats Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="bar-chart" size={18} color={colors.tint} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Estadísticas</Text>
        </View>

        <View style={styles.statsGrid}>
          {data.vida != null && (
            <StatCard
              icon="heart"
              label="Vida"
              value={formatNumber(data.vida)}
              color="#E63946"
              colors={colors}
            />
          )}
          {data.danoPorSegundo != null && (
            <StatCard
              icon="bolt"
              label="Daño/seg"
              value={formatNumber(data.danoPorSegundo)}
              color="#FFB703"
              colors={colors}
            />
          )}
          {data.nivelMaximo != null && (
            <StatCard
              icon="level-up"
              label="Nivel Máx"
              value={String(data.nivelMaximo)}
              color={roleColor}
              colors={colors}
            />
          )}
        </View>
      </View>

      {/* Habilidad Section */}
      {data.habilidad && (
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="star" size={18} color={colors.tint} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Habilidad</Text>
          </View>
          <View style={[styles.abilityContainer, { backgroundColor: roleColor + '15', borderColor: roleColor + '40' }]}>
            <FontAwesome name="star" size={16} color={roleColor} />
            <Text style={[styles.abilityText, { color: roleColor }]}>
              {data.habilidad}
            </Text>
          </View>
        </View>
      )}

      {/* Información General */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="info-circle" size={18} color={colors.tint} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Información</Text>
        </View>

        {data.nivelAyuntamientoDesbloqueo != null && (
          <InfoRow
            icon="home"
            label="Desbloqueo en TH"
            value={`Nivel ${data.nivelAyuntamientoDesbloqueo}`}
            colors={colors}
          />
        )}
        {data.tipoRecursoNombre && (
          <InfoRow
            icon="tag"
            label="Tipo de Recurso"
            value={data.tipoRecursoNombre}
            colors={colors}
          />
        )}
      </View>
    </>
  );
};

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
  colors: any;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, colors }) => (
  <View style={[styles.statCard, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
    <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
      <FontAwesome name={icon as any} size={20} color={color} />
    </View>
    <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
    <Text style={[styles.statLabel, { color: colors.text + '99' }]}>{label}</Text>
  </View>
);

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  colors: any;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, colors }) => (
  <View style={[styles.infoRow, { borderBottomColor: colors.cardBorder }]}>
    <View style={styles.infoRowLeft}>
      <FontAwesome name={icon as any} size={14} color={colors.tint} />
      <Text style={[styles.infoLabel, { color: colors.text + 'CC' }]}>{label}</Text>
    </View>
    <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  heroSection: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  roleBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  heroName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
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
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  abilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  abilityText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});

