import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface LoadingSpinnerProps {
  color: string;
  size: number;
  spin: Animated.AnimatedInterpolation<string>;
  scale: Animated.Value;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ color, size, spin, scale }) => {
  return (
    <Animated.View
      style={[
        styles.iconContainer,
        {
          transform: [{ rotate: spin }, { scale }],
        },
      ]}
    >
      <FontAwesome name="spinner" size={size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginBottom: 16,
  },
});


