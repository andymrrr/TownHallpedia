import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import { AppHeader } from '@/components/common';
import { LoadingState, ErrorState } from '@/components/common/states';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { HeroCard } from '@/features/heroes/listar/components';
import { useHeroesListViewModel } from '@/features/heroes/listar/viewModels';

export const options = {
  title: 'Héroes',
  tabBarLabel: 'Héroes',
  headerShown: false,
};

export default function HeroesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const vm = useHeroesListViewModel();

  if (vm.isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="Héroes" variant="compact" />
        <LoadingState />
      </View>
    );
  }

  if (vm.errorMessage) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="Héroes" variant="compact" />
        <ErrorState
          title="Error al cargar héroes"
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
        title="Héroes"
        variant="compact"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {vm.items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text + '99' }]}>
              No hay héroes disponibles
            </Text>
          </View>
        ) : (
          <View style={styles.heroesGrid}>
            {vm.items.map((heroe) => (
              <HeroCard
                key={heroe.id}
                id={heroe.id}
                nombre={heroe.nombre}
                descripcion={heroe.descripcion}
                iconoUrl={heroe.imagenUrl}
                nivelRequeridoTH={heroe.nivelAyuntamientoDesbloqueo}
                nivelMaximo={heroe.nivelMaximo}
                danoPorSegundo={heroe.danoPorSegundo}
                vida={heroe.vida}
                habilidad={heroe.habilidad}
                rol={heroe.rol}
              />
            ))}
          </View>
        )}
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
    padding: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroesGrid: {
    gap: 20,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

