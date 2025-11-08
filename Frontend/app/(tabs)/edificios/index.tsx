import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import { AppHeader } from '@/components/common';
import { LoadingState, ErrorState } from '@/components/common/states';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { BuildingCard } from '@/features/edificios/listar/components';
import { useEdificiosListViewModel } from '@/features/edificios/listar/viewModels';

export const options = {
  title: 'Edificios',
  tabBarLabel: 'Edificios',
  headerShown: false,
};

export default function EdificiosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const vm = useEdificiosListViewModel();

  if (vm.isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="Edificios" variant="compact" />
        <LoadingState />
      </View>
    );
  }

  if (vm.errorMessage) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="Edificios" variant="compact" />
        <ErrorState
          title="Error al cargar edificios"
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
        title="Edificios"
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
              No hay edificios disponibles
            </Text>
          </View>
        ) : (
          <View style={styles.edificiosGrid}>
            {vm.items.map((edificio) => (
              <View key={edificio.id} style={styles.cardWrapper}>
                <BuildingCard
                  id={edificio.id}
                  nombre={edificio.nombre}
                  tipo={edificio.tipo}
                  nivelRequeridoTH={edificio.nivelRequeridoTH}
                  nivelMaximo={edificio.nivelMaximo}
                  costoMejora={edificio.costoMejora}
                  tiempoMejoraHoras={edificio.tiempoMejoraHoras}
                  descripcion={edificio.descripcion}
                  imagenUrl={edificio.imagenUrl}
                />
              </View>
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
  edificiosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '47%', // 2 columnas con gap
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
});

