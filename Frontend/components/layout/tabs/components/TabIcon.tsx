import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TAB_BAR_CONSTANTS } from '../constants/tabBarConstants';

interface TabIconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  focused: boolean;
}

export function TabIcon({ name, focused }: TabIconProps) {
  const color = focused
    ? TAB_BAR_CONSTANTS.COLORS.ACTIVE
    : TAB_BAR_CONSTANTS.COLORS.INACTIVE;

  return (
    <FontAwesome
      name={name}
      size={TAB_BAR_CONSTANTS.SIZES.ICON}
      color={color}
    />
  );
}

