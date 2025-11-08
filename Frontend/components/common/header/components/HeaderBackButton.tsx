import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BACK_BUTTON_SIZE } from '../constants';

interface HeaderBackButtonProps {
  onPress?: () => void;
  iconColor: string;
  iconSize: number;
}

export function HeaderBackButton({
  onPress,
  iconColor,
  iconSize,
}: HeaderBackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Si no se proporciona onPress, usar el router para ir hacia atrás
      if (router.canGoBack()) {
        router.back();
      }
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.backButton,
        {
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <FontAwesome name="chevron-left" size={iconSize} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: BACK_BUTTON_SIZE,
    height: BACK_BUTTON_SIZE,
    marginRight: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
  },
});
