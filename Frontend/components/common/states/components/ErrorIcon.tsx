import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ErrorIconProps {
  errorColor: string;
  size: number; // final icon size (circle size is based on this)
  scale: Animated.AnimatedInterpolation<number> | Animated.Value;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ errorColor, size, scale }) => {
  const circleSize = Math.round(size * 1.875); // 120 when icon is 64

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <View
        style={[
          styles.iconCircle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: errorColor + '20',
          },
        ]}
      >
        <FontAwesome name="exclamation-triangle" size={size} color={errorColor} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


