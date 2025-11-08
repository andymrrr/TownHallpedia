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
        {/* Alerta de no oficial */}
        <View style={[styles.warningAlert, { 
          backgroundColor: colors.card,
          borderColor: colors.accent + '40',
        }]}>
          <Text style={[styles.warningIcon, { color: colors.accent }]}>⚠️</Text>
          <View style={styles.warningContent}>
            <Text style={[styles.warningTitle, { color: colors.text }]}>
              Aviso Importante
            </Text>
            <Text style={[styles.warningText, { color: colors.text + 'CC' }]}>
              Esta aplicación <Text style={[styles.warningBold, { color: colors.text }]}>NO es oficial</Text> de Clash of Clans. Es un proyecto independiente de la comunidad.
            </Text>
            <Text style={[styles.warningSubtext, { color: colors.text + '99' }]}>
              Clash of Clans es una marca registrada de Supercell Oy
            </Text>
          </View>
        </View>

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
  warningAlert: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  warningBold: {
    fontWeight: 'bold',
  },
  warningSubtext: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
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

