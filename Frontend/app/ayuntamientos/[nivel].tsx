import { Stack, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/Themed';
import { AppHeader } from '@/components/common';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function AyuntamientoDetailScreen() {
  const { nivel } = useLocalSearchParams<{ nivel: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: `Ayuntamiento ${nivel}` }} />
      <AppHeader title={`Ayuntamiento ${nivel}`} variant="default" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={{ color: colors.text }}>
          Detalle del Ayuntamiento nivel {nivel}
        </Text>
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
    padding: 20,
  },
});


