import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ImageWithFallback } from '@/components/common';
import { EntityType } from '@/utils/images';
import { formatNumber, formatTimeHours, getLevelColor } from '../../listar/components/TownHallCard/utils/townHallUtils';
import { AyuntamientoDetailData } from '../interfaces';

interface AyuntamientoDetailInfoProps {
  data: AyuntamientoDetailData;
}

export const AyuntamientoDetailInfo: React.FC<AyuntamientoDetailInfoProps> = ({ data }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const levelColor = getLevelColor(data.nivel);

  return (
    <>
      {/* Hero Image Section */}
      <View style={[styles.heroSection, { backgroundColor: colors.card }]}>
        <View style={[styles.imageWrapper, { backgroundColor: colors.background }]}>
          <ImageWithFallback
            imageUrl={data.imagenUrl}
            entityType={EntityType.AYUNTAMIENTO}
            style={styles.heroImage}
            placeholderIconColor={levelColor}
            placeholderBackgroundColor={levelColor + '15'}
            placeholderIconSize={120}
          />
          <View style={[styles.levelBadge, { backgroundColor: levelColor + '20' }]}>
            <View style={[styles.levelBadgeInner, { backgroundColor: levelColor }]}>
              <Text style={styles.levelBadgeText}>Nv. {data.nivel}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Capacidades Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="database" size={18} color={colors.tint} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Capacidades de Almacenamiento</Text>
        </View>
        
        <View style={styles.statsGrid}>
          <StatCard
            icon="money"
            label="Oro"
            value={formatNumber(data.capacidadOro)}
            color="#FFD700"
            colors={colors}
          />
          <StatCard
            icon="tint"
            label="Elixir"
            value={formatNumber(data.capacidadElixir)}
            color="#E63946"
            colors={colors}
          />
          <StatCard
            icon="fire"
            label="Oscuro"
            value={formatNumber(data.capacidadOscuro)}
            color="#7209B7"
            colors={colors}
          />
        </View>
      </View>

      {/* Información de Mejora */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="arrow-up" size={18} color={colors.tint} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Información de Mejora</Text>
        </View>

        <InfoRow
          icon="clock-o"
          label="Tiempo de Construcción"
          value={formatTimeHours(data.tiempoConstruccion)}
          colors={colors}
        />
        <InfoRow
          icon="dollar"
          label="Costo de Mejora"
          value={formatNumber(data.costoMejora)}
          colors={colors}
        />
        <InfoRow
          icon="tag"
          label="Tipo de Recurso"
          value={data.tipoRecursoNombre || 'N/A'}
          colors={colors}
        />
      </View>

      {/* Características */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="star" size={18} color={colors.tint} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Características</Text>
        </View>
        
        <FeatureItem
          icon="shield"
          text="Edificio principal del pueblo"
          colors={colors}
        />
        <FeatureItem
          icon="home"
          text="Desbloquea nuevas construcciones"
          colors={colors}
        />
        <FeatureItem
          icon="users"
          text="Aumenta el límite de tropas"
          colors={colors}
        />
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

interface FeatureItemProps {
  icon: string;
  text: string;
  colors: any;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, colors }) => (
  <View style={styles.featureItem}>
    <FontAwesome name={icon as any} size={16} color={colors.tint} />
    <Text style={[styles.featureText, { color: colors.text + 'CC' }]}>{text}</Text>
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
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  levelBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 16,
    padding: 3,
  },
  levelBadgeInner: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
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
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
});

