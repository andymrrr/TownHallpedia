import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
  return (
    <Pressable
      onPress={onPress}
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

