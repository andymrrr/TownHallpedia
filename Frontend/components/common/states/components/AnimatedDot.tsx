import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

interface AnimatedDotProps {
  delay: number;
  color: string;
  size: 'small' | 'medium' | 'large';
}

export const AnimatedDot: React.FC<AnimatedDotProps> = ({ delay, color, size }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const dotSize = size === 'small' ? 6 : size === 'medium' ? 8 : 10;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color,
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    marginHorizontal: 4,
  },
});


