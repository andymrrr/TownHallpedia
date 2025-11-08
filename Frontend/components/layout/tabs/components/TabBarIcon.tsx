import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface TabBarIconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  centered?: boolean;
}

export function TabBarIcon({ name, color, centered }: TabBarIconProps) {
  if (centered) {
    return <FontAwesome size={28} name={name} color={color} />;
  }
  return <FontAwesome size={24} name={name} color={color} style={{ marginBottom: -3 }} />;
}

