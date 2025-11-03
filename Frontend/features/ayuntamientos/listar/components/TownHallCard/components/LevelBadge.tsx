import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Themed';

interface LevelBadgeProps {
  nivel: number;
  color: string;
}

export function LevelBadge({ nivel, color }: LevelBadgeProps) {
  return (
    <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: color + '20' }}>
      <Text style={{ fontSize: 12, fontWeight: 'bold', color }}>TH{nivel}</Text>
    </View>
  );
}
