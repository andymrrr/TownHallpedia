import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import AppHeader from '@/components/common/header/AppHeader';
import { LoadingState, ErrorState } from '@/components/common/states';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { TownHallCard } from '@/features/ayuntamientos/listar/components';
import { useAyuntamientosListViewModel } from '@/features/ayuntamientos/listar/viewModels';

export const options = {
  title: 'Ayuntamientos',
  tabBarLabel: 'Ayuntamientos',
  headerShown: false,
};

export default function AyuntamientosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const vm = useAyuntamientosListViewModel({ page: 1, limit: 20, withCount: true });

  if (vm.isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="TownHallpedia" variant="compact" />
        <LoadingState />
      </View>
    );
  }

  if (vm.errorMessage) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="TownHallpedia" variant="compact" />
        <ErrorState
          title="Error al cargar ayuntamientos"
          message={vm.errorMessage}
          onRetry={vm.refetch}
          retryLabel="Reintentar"
        />
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
          {vm.items.map((ayuntamiento) => (
            <TownHallCard
              key={ayuntamiento.nivel}
              nivel={ayuntamiento.nivel}
              capacidadOro={ayuntamiento.capacidadOro}
              capacidadElixir={ayuntamiento.capacidadElixir}
              capacidadOscuro={ayuntamiento.capacidadOscuro}
              tiempoConstruccion={ayuntamiento.tiempoConstruccion}
              costoMejora={ayuntamiento.costoMejora}
              tipoRecursoNombre={ayuntamiento.tipoRecursoNombre}
              imagenUrl={ayuntamiento.imagenUrl}
              onPress={() => vm.navigateToDetail(ayuntamiento.nivel)}
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

