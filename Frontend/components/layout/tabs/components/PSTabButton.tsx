import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { tabButtonStyles } from '../styles/tabBarStyles';

interface PSTabButtonProps {
  children: React.ReactNode;
  onPress?: (e: any) => void;
  accessibilityState?: { selected?: boolean };
  label?: string;
}

export function PSTabButton({
  children,
  onPress,
  accessibilityState,
  label,
}: PSTabButtonProps) {
  const isSelected = accessibilityState?.selected ?? false;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        tabButtonStyles.button,
        pressed && tabButtonStyles.buttonPressed,
      ]}
    >
      <View style={tabButtonStyles.content}>
        <View style={tabButtonStyles.iconContainer}>{children}</View>
        {isSelected && (
          <>
            <View style={tabButtonStyles.indicatorLine} />
            {label && (
              <Text style={tabButtonStyles.label}>{label}</Text>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
}

