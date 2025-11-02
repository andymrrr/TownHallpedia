import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import { AppHeader } from '@/components/common';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { SpellCard } from '@/features/hechizos/components';

export const options = {
  title: 'Hechizos',
  tabBarLabel: 'Hechizos',
  headerShown: false,
};

export default function HechizosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

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
        <View style={styles.list}>
          <SpellCard
            nombre="Rayo"
            tipo="Elixir"
            nivelRequerido={5}
            costoMejora={12000}
            tiempoMejoraHoras={12}
            descripcion="Inflige daño instantáneo a edificios y tropas enemigas."
          />
          <SpellCard
            nombre="Curación"
            tipo="Elixir"
            nivelRequerido={6}
            costoMejora={16000}
            tiempoMejoraHoras={14}
            descripcion="Crea un área que regenera vida a tus tropas."
          />
          <SpellCard
            nombre="Veneno"
            tipo="Oscuro"
            nivelRequerido={8}
            costoMejora={24000}
            tiempoMejoraHoras={18}
            descripcion="Reduce velocidad y vida de tropas enemigas en el área."
          />
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
    padding: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  list: {
    gap: 12,
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

