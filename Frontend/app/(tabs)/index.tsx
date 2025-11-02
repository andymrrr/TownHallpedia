import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import { TownHallCard } from '@/components/ayuntamiento';
import { AppHeader } from '@/components/common';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Datos mock de ayuntamientos - Sin conectar a API aún
const mockAyuntamientos = [
  { nivel: 1, capacidadOro: 10000, capacidadElixir: 10000, costoMejora: 0, tiempoConstruccion: 0 },
  { nivel: 2, capacidadOro: 15000, capacidadElixir: 15000, costoMejora: 5000, tiempoConstruccion: 1, tipoRecurso: 'Oro' },
  { nivel: 3, capacidadOro: 25000, capacidadElixir: 25000, costoMejora: 10000, tiempoConstruccion: 2, tipoRecurso: 'Oro' },
  { nivel: 4, capacidadOro: 50000, capacidadElixir: 50000, costoMejora: 50000, tiempoConstruccion: 4, tipoRecurso: 'Oro' },
  { nivel: 5, capacidadOro: 100000, capacidadElixir: 100000, costoMejora: 250000, tiempoConstruccion: 8, tipoRecurso: 'Oro' },
  { nivel: 6, capacidadOro: 250000, capacidadElixir: 250000, capacidadOscuro: 2500, costoMejora: 750000, tiempoConstruccion: 16, tipoRecurso: 'Oro' },
  { nivel: 7, capacidadOro: 500000, capacidadElixir: 500000, capacidadOscuro: 5000, costoMejora: 1500000, tiempoConstruccion: 24, tipoRecurso: 'Oro' },
  { nivel: 8, capacidadOro: 1000000, capacidadElixir: 1000000, capacidadOscuro: 10000, costoMejora: 2500000, tiempoConstruccion: 48, tipoRecurso: 'Oro' },
  { nivel: 9, capacidadOro: 2000000, capacidadElixir: 2000000, capacidadOscuro: 20000, costoMejora: 4000000, tiempoConstruccion: 72, tipoRecurso: 'Oro' },
  { nivel: 10, capacidadOro: 3000000, capacidadElixir: 3000000, capacidadOscuro: 30000, costoMejora: 6000000, tiempoConstruccion: 120, tipoRecurso: 'Oro' },
  { nivel: 11, capacidadOro: 4000000, capacidadElixir: 4000000, capacidadOscuro: 40000, costoMejora: 8000000, tiempoConstruccion: 192, tipoRecurso: 'Oro' },
  { nivel: 12, capacidadOro: 5000000, capacidadElixir: 5000000, capacidadOscuro: 50000, costoMejora: 10000000, tiempoConstruccion: 288, tipoRecurso: 'Oro' },
  { nivel: 13, capacidadOro: 6000000, capacidadElixir: 6000000, capacidadOscuro: 60000, costoMejora: 12000000, tiempoConstruccion: 384, tipoRecurso: 'Oro' },
  { nivel: 14, capacidadOro: 7000000, capacidadElixir: 7000000, capacidadOscuro: 70000, costoMejora: 14000000, tiempoConstruccion: 480, tipoRecurso: 'Oro' },
  { nivel: 15, capacidadOro: 8000000, capacidadElixir: 8000000, capacidadOscuro: 80000, costoMejora: 16000000, tiempoConstruccion: 576, tipoRecurso: 'Oro' },
];

export default function AyuntamientosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleTownHallPress = (nivel: number) => {
    // Placeholder - sin conectar nada aún
    console.log(`Ver detalles del Ayuntamiento nivel ${nivel}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="TownHallpedia"
        variant="compact"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ayuntamientosContainer}>
          {mockAyuntamientos.map((ayuntamiento) => (
            <TownHallCard
              key={ayuntamiento.nivel}
              nivel={ayuntamiento.nivel}
              capacidadOro={ayuntamiento.capacidadOro}
              capacidadElixir={ayuntamiento.capacidadElixir}
              capacidadOscuro={ayuntamiento.capacidadOscuro}
              tiempoConstruccion={ayuntamiento.tiempoConstruccion}
              costoMejora={ayuntamiento.costoMejora}
              tipoRecurso={ayuntamiento.tipoRecurso}
              onPress={() => handleTownHallPress(ayuntamiento.nivel)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text + '99' }]}>
            Toca un ayuntamiento para ver más detalles
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  ayuntamientosContainer: {
    marginTop: 0,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
