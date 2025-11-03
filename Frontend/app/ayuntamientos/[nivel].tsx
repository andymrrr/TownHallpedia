import { Stack, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, ScrollView, Image, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/Themed';
import AppHeader from '@/components/common/header/AppHeader';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { getTownHallImage, getPlaceholderImageUrl } from '@/features/ayuntamientos/components/TownHallCard/utils/townHallImages';
import { formatNumber, formatTimeHours, getLevelColor } from '@/features/ayuntamientos/components/TownHallCard/utils/townHallUtils';

// Datos de demo - luego se reemplazarán con datos del backend
const getDemoData = (nivel: number) => {
  const base = nivel * 100000;
  return {
    nivel,
    capacidadOro: base * 2,
    capacidadElixir: base * 2,
    capacidadOscuro: base * 0.5,
    tiempoConstruccion: nivel * 24,
    costoMejora: base * 10,
    tipoRecurso: nivel <= 5 ? 'Oro' : 'Elixir',
    imagenUrl: undefined,
  };
};

export default function AyuntamientoDetailScreen() {
  const { nivel } = useLocalSearchParams<{ nivel: string }>();
  const nivelNum = parseInt(nivel || '1', 10);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const demoData = getDemoData(nivelNum);
  const levelColor = getLevelColor(nivelNum);

  const imageSource: ImageSourcePropType = demoData.imagenUrl
    ? { uri: demoData.imagenUrl }
    : (getTownHallImage(nivelNum, demoData.imagenUrl) as ImageSourcePropType) || { uri: getPlaceholderImageUrl(nivelNum) };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{ 
          title: `Ayuntamiento ${nivelNum}`,
          headerShown: false,
        }} 
      />
      <AppHeader 
        title="Ayuntamiento" 
        subtitle={`Nivel ${nivelNum}`}
        variant="compact" 
        showBackButton={true}
      />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Section */}
        <View style={[styles.heroSection, { backgroundColor: colors.card }]}>
          <View style={[styles.imageWrapper, { backgroundColor: colors.background }]}>
            <Image
              source={imageSource}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <View style={[styles.levelBadge, { backgroundColor: levelColor + '20' }]}>
              <View style={[styles.levelBadgeInner, { backgroundColor: levelColor }]}>
                <Text style={styles.levelBadgeText}>Nv. {nivelNum}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Capacidades Section */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="database" size={20} color={colors.tint} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Capacidades de Almacenamiento</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <StatCard
              icon="money"
              label="Oro"
              value={formatNumber(demoData.capacidadOro)}
              color="#FFD700"
              colors={colors}
            />
            <StatCard
              icon="tint"
              label="Elixir"
              value={formatNumber(demoData.capacidadElixir)}
              color="#E63946"
              colors={colors}
            />
            <StatCard
              icon="fire"
              label="Oscuro"
              value={formatNumber(demoData.capacidadOscuro)}
              color="#7209B7"
              colors={colors}
            />
          </View>
        </View>

        {/* Información de Mejora */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="arrow-up" size={20} color={colors.tint} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Información de Mejora</Text>
          </View>

          <InfoRow
            icon="clock-o"
            label="Tiempo de Construcción"
            value={formatTimeHours(demoData.tiempoConstruccion)}
            colors={colors}
          />
          <InfoRow
            icon="dollar"
            label="Costo de Mejora"
            value={formatNumber(demoData.costoMejora)}
            colors={colors}
          />
          <InfoRow
            icon="tag"
            label="Tipo de Recurso"
            value={demoData.tipoRecurso || 'N/A'}
            colors={colors}
          />
        </View>

        {/* Características */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="star" size={20} color={colors.tint} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Características</Text>
          </View>
          
          <FeatureItem
            icon="shield"
            text="Edificio principal del pueblo"
            colors={colors}
          />
          <FeatureItem
            icon="home"
            text={`Desbloquea nuevas construcciones`}
            colors={colors}
          />
          <FeatureItem
            icon="users"
            text={`Aumenta el límite de tropas`}
            colors={colors}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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
      <FontAwesome name={icon as any} size={24} color={color} />
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
      <FontAwesome name={icon as any} size={16} color={colors.tint} />
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
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
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  levelBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 20,
    padding: 4,
  },
  levelBadgeInner: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  featureText: {
    fontSize: 15,
    flex: 1,
  },
});
