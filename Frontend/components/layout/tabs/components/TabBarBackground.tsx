import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { tabBarBackgroundStyles } from '../styles/tabBarStyles';
import { TAB_BAR_CONSTANTS } from '../constants/tabBarConstants';

export function TabBarBackground() {
  return (
    <View style={tabBarBackgroundStyles.container}>
      <LinearGradient
        colors={[
          TAB_BAR_CONSTANTS.COLORS.BACKGROUND_START,
          TAB_BAR_CONSTANTS.COLORS.BACKGROUND_END,
        ]}
        style={StyleSheet.absoluteFill}
      />
      <View style={tabBarBackgroundStyles.border} />
    </View>
  );
}

