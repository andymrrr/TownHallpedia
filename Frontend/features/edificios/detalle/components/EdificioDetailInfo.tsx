import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ImageWithFallback } from '@/components/common';
import { EntityType } from '@/utils/images';
import { EdificioDetailData } from '../interfaces';

interface EdificioDetailInfoProps {
  data: EdificioDetailData;
}

function getBuildingColor(tipo?: string): string {
  if (!tipo) return '#8B4513';
  const tipoLower = tipo.toLowerCase();
  if (tipoLower.includes('defensa') || tipoLower.includes('defense')) return '#E74C3C';
  if (tipoLower.includes('recurso') || tipoLower.includes('resource')) return '#F39C12';
  if (tipoLower.includes('tropa') || tipoLower.includes('troop')) return '#3498DB';
  if (tipoLower.includes('hechizo') || tipoLower.includes('spell')) return '#9B59B6';
  if (tipoLower.includes('almacen') || tipoLower.includes('storage')) return '#2ECC71';
  return '#8B4513'; // Marrón por defecto
}

function getBuildingGradient(typeColor: string, colorScheme?: 'light' | 'dark' | null): string[] {
  return [
    typeColor + '25',
    typeColor + '10',
  ];
}

function formatNumber(num?: number): string {
  if (!num) return '—';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return String(num);
}

function formatTime(hours?: number): string {
  if (!hours) return '—';
  if (hours >= 24) {
    const d = Math.floor(hours / 24);
    const h = hours % 24;
    return h ? `${d}d ${h}h` : `${d}d`;
  }
  return `${hours}h`;
}

export const EdificioDetailInfo: React.FC<EdificioDetailInfoProps> = ({ data }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const buildingColor = getBuildingColor(data.tipo);
  const gradientColors = getBuildingGradient(buildingColor, colorScheme);

  return (
    <>
      {/* Building Image Section */}
      <View style={[styles.buildingSection, { backgroundColor: colors.card }]}>
        <View style={[styles.imageWrapper, { backgroundColor: gradientColors[0] + '15' }]}>
          <ImageWithFallback
            imageUrl={data.imagenUrl}
            entityType={EntityType.EDIFICIO}
            style={styles.buildingImage}
            placeholderIconColor={buildingColor}
            placeholderBackgroundColor={gradientColors[0] + '30'}
            placeholderIconSize={120}
          />
          {data.tipo && (
            <View style={[styles.typeBadge, { backgroundColor: buildingColor }]}>
              <Text style={styles.typeText}>{data.tipo}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.buildingName, { color: colors.text }]}>{data.nombre}</Text>
        {data.descripcion && (
          <Text style={[styles.description, { color: colors.text + 'CC' }]}>
            {data.descripcion}
          </Text>
        )}
      </View>

      {/* Info Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="info-circle" size={18} color={colors.tint} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Información</Text>
        </View>

        {data.nivelRequeridoTH != null && (
          <InfoRow
            icon="home"
            label="Nivel Ayuntamiento Requerido"
            value={`TH ${data.nivelRequeridoTH}`}
            colors={colors}
          />
        )}
        {data.nivelMaximo != null && (
          <InfoRow
            icon="level-up"
            label="Nivel Máximo"
            value={String(data.nivelMaximo)}
            colors={colors}
          />
        )}
        {data.costoMejora != null && (
          <InfoRow
            icon="dollar"
            label="Costo de Mejora"
            value={formatNumber(data.costoMejora)}
            colors={colors}
          />
        )}
        {data.tiempoMejoraHoras != null && (
          <InfoRow
            icon="clock-o"
            label="Tiempo de Mejora"
            value={formatTime(data.tiempoMejoraHoras)}
            colors={colors}
          />
        )}
        {data.tipo && (
          <InfoRow
            icon="tag"
            label="Tipo"
            value={data.tipo}
            colors={colors}
          />
        )}
      </View>
    </>
  );
};

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
  buildingSection: {
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
  buildingImage: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  buildingName: {
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

