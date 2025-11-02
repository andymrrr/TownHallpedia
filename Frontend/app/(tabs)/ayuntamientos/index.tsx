import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import { AppHeader } from '@/components/common';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { TownHallCard } from '@/features/ayuntamientos/components';
import { useAyuntamientosScreen } from './useAyuntamientosScreen';

export const options = {
  title: 'Ayuntamientos',
  tabBarLabel: 'Ayuntamientos',
  headerShown: false,
};

export default function AyuntamientosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { viewModel, isLoading, error } = useAyuntamientosScreen();

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="TownHallpedia" variant="compact" />
        <View style={styles.centerContent}>
          <Text style={{ color: colors.text }}>Cargando...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="TownHallpedia" variant="compact" />
        <View style={styles.centerContent}>
          <Text style={{ color: colors.text }}>Error al cargar ayuntamientos</Text>
        </View>
      </View>
    );
  }

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
          {viewModel.items.map((ayuntamiento) => (
            <TownHallCard
              key={ayuntamiento.nivel}
              nivel={ayuntamiento.nivel}
              capacidadOro={ayuntamiento.capacidadOro}
              capacidadElixir={ayuntamiento.capacidadElixir}
              capacidadOscuro={ayuntamiento.capacidadOscuro}
              tiempoConstruccion={ayuntamiento.tiempoConstruccion}
              costoMejora={ayuntamiento.costoMejora}
              tipoRecurso={ayuntamiento.tipoRecurso}
              onPress={() => viewModel.navigateToDetail(ayuntamiento.nivel)}
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

