import { StyleSheet, ScrollView, View, TextInput } from 'react-native';
import { Text } from '@/components/Themed';
import { AppHeader } from '@/components/common';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function BuscarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchText, setSearchText] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Buscar"
        variant="compact"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { 
            backgroundColor: colors.card,
            borderColor: colors.cardBorder 
          }]}>
            <FontAwesome 
              name="search" 
              size={18} 
              color={colors.text + '80'} 
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar ayuntamientos, héroes, hechizos..."
              placeholderTextColor={colors.text + '60'}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        <View style={styles.content}>
          {searchText ? (
            <Text style={[styles.description, { color: colors.text + 'CC' }]}>
              Resultados para: "{searchText}"
            </Text>
          ) : (
            <>
              <FontAwesome 
                name="search" 
                size={48} 
                color={colors.text + '40'} 
                style={styles.placeholderIcon}
              />
              <Text style={[styles.description, { color: colors.text + 'CC' }]}>
                Busca ayuntamientos, héroes, hechizos y más
              </Text>
            </>
          )}
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
  searchContainer: {
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    paddingTop: 40,
  },
  placeholderIcon: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

