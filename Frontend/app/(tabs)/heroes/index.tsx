import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/Themed';
import { AppHeader } from '@/components/common';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { HeroCard } from '@/features/heroes/components';

export const options = {
  title: 'Héroes',
  tabBarLabel: 'Héroes',
  headerShown: false,
};

export default function HeroesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

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
        <View style={styles.list}>
          <HeroCard
            nombre="Rey Bárbaro"
            rol="Tanque"
            nivelRequeridoTH={7}
            danoPorSegundo={150}
            vida={4200}
            habilidad="Furia del Rey"
            descripcion="Poderoso luchador cuerpo a cuerpo que absorbe daño y lidera el ataque."
          />
          <HeroCard
            nombre="Reina Arquera"
            rol="Ofensivo"
            nivelRequeridoTH={9}
            danoPorSegundo={280}
            vida={1360}
            habilidad="Manto Real"
            descripcion="Atacante a distancia de alto daño con capacidad de invisibilidad temporal."
          />
          <HeroCard
            nombre="Gran Centinela"
            rol="Soporte"
            nivelRequeridoTH={11}
            danoPorSegundo={170}
            vida={1800}
            habilidad="Habilidad del Guardián"
            descripcion="Otorga aura de vida extra y un escudo temporal imparable a las tropas cercanas."
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

