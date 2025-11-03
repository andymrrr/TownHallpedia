import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useErrorStateAnimations = () => {
  const shakeValue = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(shakeValue, {
        toValue: 10,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: -10,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: 5,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(shakeValue, {
        toValue: 0,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(iconScale, {
          toValue: 1.1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, []);

  return { shakeValue, iconScale };
};


