import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ImageWithFallback } from '@/components/common';
import { EntityType } from '@/utils/images';
import { HechizoDetailData } from '../interfaces';

interface HechizoDetailInfoProps {
  data: HechizoDetailData;
}

function getSpellColor(tipo?: string): string {
  if (!tipo) return '#0070F3';
  if (tipo.toLowerCase().includes('oscuro')) return '#8E44AD';
  if (tipo.toLowerCase().includes('super')) return '#E67E22';
  return '#3498DB'; // Elixir
}

function getSpellGradient(typeColor: string, colorScheme?: 'light' | 'dark' | null): string[] {
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

export const HechizoDetailInfo: React.FC<HechizoDetailInfoProps> = ({ data }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const typeColor = getSpellColor(data.tipo);
  const gradientColors = getSpellGradient(typeColor, colorScheme);

  return (
    <>
      {/* Spell Image Section */}
      <View style={[styles.spellSection, { backgroundColor: colors.card }]}>
        <View style={[styles.imageWrapper, { backgroundColor: gradientColors[0] + '15' }]}>
          <ImageWithFallback
            imageUrl={data.imagenUrl}
            entityType={EntityType.HECHIZO}
            style={styles.spellImage}
            placeholderIconColor={typeColor}
            placeholderBackgroundColor={gradientColors[0] + '30'}
            placeholderIconSize={120}
          />
          {data.tipo && (
            <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
              <Text style={styles.typeText}>{data.tipo}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.spellName, { color: colors.text }]}>{data.nombre}</Text>
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

        {data.espacioHechizo != null && (
          <InfoRow
            icon="cube"
            label="Espacio de Hechizo"
            value={String(data.espacioHechizo)}
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
  spellSection: {
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
  spellImage: {
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
  spellName: {
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

