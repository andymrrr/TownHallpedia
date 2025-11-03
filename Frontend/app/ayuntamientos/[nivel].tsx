import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AppHeader from '@/components/common/header/AppHeader';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { LoadingState, ErrorState } from '@/components/common/states';
import { useAyuntamientoDetailViewModel } from '@/features/ayuntamientos/detalle/viewModels';
import { AyuntamientoDetailTabs, AyuntamientoDetailInfo, AyuntamientoDetailDesbloqueos } from '@/features/ayuntamientos/detalle/components';

export default function AyuntamientoDetailScreen() {
  const { nivel } = useLocalSearchParams<{ nivel: string }>();
  const nivelNum = parseInt(nivel || '1', 10);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const vm = useAyuntamientoDetailViewModel(nivelNum);

  const handleRefresh = async () => {
    await vm.refetch();
  };

  const RefreshButton = () => (
    <Pressable
      onPress={handleRefresh}
      style={({ pressed }) => [
        styles.refreshButton,
        { opacity: pressed ? 0.6 : 1 },
      ]}
      disabled={vm.isLoading}
    >
      {vm.isLoading ? (
        <ActivityIndicator size="small" color={colors.tint} />
      ) : (
        <FontAwesome name="refresh" size={20} color={colors.tint} />
      )}
    </Pressable>
  );

  if (vm.isLoading && !vm.data) {
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
          rightAction={<RefreshButton />}
        />
        <LoadingState />
      </View>
    );
  }

  if (vm.errorMessage && !vm.data) {
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
          rightAction={<RefreshButton />}
        />
        <ErrorState
          title="Error al cargar ayuntamiento"
          message={vm.errorMessage}
          onRetry={vm.refetch}
          retryLabel="Reintentar"
        />
      </View>
    );
  }

  // Si no hay datos pero tampoco hay error ni está cargando, mostrar estado vacío
  if (!vm.data && !vm.isLoading && !vm.errorMessage) {
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
          rightAction={<RefreshButton />}
        />
        <ErrorState
          title="Ayuntamiento no encontrado"
          message={`No se encontró información para el ayuntamiento nivel ${nivelNum}`}
          onRetry={vm.refetch}
          retryLabel="Reintentar"
        />
      </View>
    );
  }

  if (!vm.data) {
    return null;
  }

  const desbloqueosCount = vm.data.heroes.length + vm.data.tropas.length + vm.data.hechizos.length;

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
        rightAction={<RefreshButton />}
      />
      
      <AyuntamientoDetailTabs
        activeTab={vm.activeTab}
        onTabChange={vm.setActiveTab}
        desbloqueosCount={desbloqueosCount}
      />

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {vm.activeTab === 'info' ? (
          <AyuntamientoDetailInfo data={vm.data} />
        ) : (
          <AyuntamientoDetailDesbloqueos
            heroes={vm.data.heroes}
            tropas={vm.data.tropas}
            hechizos={vm.data.hechizos}
            activeSubTab={vm.activeSubTab}
            onSubTabChange={vm.setActiveSubTab}
          />
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
    paddingBottom: 40,
  },
  refreshButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
