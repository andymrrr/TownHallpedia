import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

import { LoadingStateProps } from './interfaces';
import { useLoadingAnimations } from './hooks/useLoadingAnimations';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AnimatedDot } from './components/AnimatedDot';

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  size = 'medium'
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { spin, pulseValue } = useLoadingAnimations();

  const iconSize = size === 'small' ? 24 : size === 'medium' ? 32 : 40;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <LoadingSpinner color={colors.tint} size={iconSize} spin={spin} scale={pulseValue} />
      </View>
      
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map((index) => (
          <AnimatedDot
            key={index}
            delay={index * 200}
            color={colors.tint}
            size={size}
          />
        ))}
      </View>
    </View>
  );
};

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  content: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    marginHorizontal: 4,
  },
});
