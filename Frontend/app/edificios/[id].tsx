import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AppHeader from '@/components/common/header/AppHeader';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { LoadingState, ErrorState } from '@/components/common/states';
import { useEdificioDetailViewModel } from '@/features/edificios/detalle/viewModels';
import { EdificioDetailInfo, EdificioDetailDesbloqueos } from '@/features/edificios/detalle/components';

export default function EdificioDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const edificioId = parseInt(id || '0', 10);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const vm = useEdificioDetailViewModel(edificioId);

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
            title: 'Edificio',
            headerShown: false,
          }} 
        />
        <AppHeader 
          title="Edificio" 
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
            title: 'Edificio',
            headerShown: false,
          }} 
        />
        <AppHeader 
          title="Edificio" 
          variant="compact" 
          showBackButton={true}
          rightAction={<RefreshButton />}
        />
        <ErrorState
          title="Error al cargar edificio"
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
            title: 'Edificio',
            headerShown: false,
          }} 
        />
        <AppHeader 
          title="Edificio" 
          variant="compact" 
          showBackButton={true}
          rightAction={<RefreshButton />}
        />
        <ErrorState
          title="Edificio no encontrado"
          message={`No se encontró información para el edificio con ID ${edificioId}`}
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
        <EdificioDetailInfo data={vm.data} />
        <EdificioDetailDesbloqueos data={vm.data} />
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

