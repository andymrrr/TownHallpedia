import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type HeaderVariant = 'default' | 'compact' | 'large';

export interface HeaderVariantStyles {
  titleSize: number;
  subtitleSize: number;
  paddingVertical: number;
}

export interface BaseHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: ReactNode;
  variant?: HeaderVariant;
  style?: ViewStyle;
}

export interface AppHeaderProps extends BaseHeaderProps {
  centered?: boolean;
}

