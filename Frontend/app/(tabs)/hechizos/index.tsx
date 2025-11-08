import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import { AppHeader } from '@/components/common';
import { LoadingState, ErrorState } from '@/components/common/states';
import { useColorScheme } from '@/components/useColorScheme';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { SpellCard } from '@/features/hechizos/listar/components';
import { useHechizosListViewModel } from '@/features/hechizos/listar/viewModels';

export const options = {
  title: 'Hechizos',
  tabBarLabel: 'Hechizos',
  headerShown: false,
};

export default function HechizosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const vm = useHechizosListViewModel();

  const handleHechizoPress = (id: number) => {
    router.push(`/hechizos/${id}`);
  };

  if (vm.isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="Hechizos" variant="compact" />
        <LoadingState />
      </View>
    );
  }

  if (vm.errorMessage) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <AppHeader title="Hechizos" variant="compact" />
        <ErrorState
          title="Error al cargar hechizos"
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
        title="Hechizos"
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
              No hay hechizos disponibles
            </Text>
          </View>
        ) : (
          <View style={styles.hechizosGrid}>
            {vm.items.map((hechizo) => (
              <View key={hechizo.id} style={styles.cardWrapper}>
                <SpellCard
                  nombre={hechizo.nombre}
                  tipo={hechizo.tipo || 'Elixir'}
                  nivelRequerido={hechizo.nivelRequeridoTH}
                  costoMejora={hechizo.costoMejora}
                  tiempoMejoraHoras={hechizo.tiempoMejoraHoras}
                  descripcion={hechizo.descripcion}
                  imagenUrl={hechizo.imagenUrl}
                  onPress={() => handleHechizoPress(hechizo.id)}
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
  hechizosGrid: {
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

