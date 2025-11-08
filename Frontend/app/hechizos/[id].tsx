import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AppHeader from '@/components/common/header/AppHeader';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { LoadingState, ErrorState } from '@/components/common/states';
import { useHechizoDetailViewModel } from '@/features/hechizos/detalle/viewModels';
import { HechizoDetailInfo, HechizoDetailDesbloqueos } from '@/features/hechizos/detalle/components';

export default function HechizoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hechizoId = parseInt(id || '0', 10);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const vm = useHechizoDetailViewModel(hechizoId);

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
            title: 'Hechizo',
            headerShown: false,
          }} 
        />
        <AppHeader 
          title="Hechizo" 
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
            title: 'Hechizo',
            headerShown: false,
          }} 
        />
        <AppHeader 
          title="Hechizo" 
          variant="compact" 
          showBackButton={true}
          rightAction={<RefreshButton />}
        />
        <ErrorState
          title="Error al cargar hechizo"
          message={vm.errorMessage}
          onRetry={vm.refetch}
          retryLabel="Reintentar"
        />
      </View>
    );
  }

  if (!vm.data && !vm.isLoading && !vm.errorMessage) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen 
          options={{ 
            title: 'Hechizo',
            headerShown: false,
          }} 
        />
        <AppHeader 
          title="Hechizo" 
          variant="compact" 
          showBackButton={true}
          rightAction={<RefreshButton />}
        />
        <ErrorState
          title="Hechizo no encontrado"
          message={`No se encontró información para el hechizo con ID ${hechizoId}`}
          onRetry={vm.refetch}
          retryLabel="Reintentar"
        />
      </View>
    );
  }

  if (!vm.data) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{ 
          title: vm.data.nombre,
          headerShown: false,
        }} 
      />
      <AppHeader 
        title={vm.data.nombre}
        variant="compact" 
        showBackButton={true}
        rightAction={<RefreshButton />}
      />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HechizoDetailInfo data={vm.data} />
        <HechizoDetailDesbloqueos data={vm.data} />
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
    paddingBottom: 20,
  },
  refreshButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

