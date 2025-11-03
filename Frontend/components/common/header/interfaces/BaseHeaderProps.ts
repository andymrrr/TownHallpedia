import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { HeaderVariant } from '../types';

export interface BaseHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: ReactNode;
  variant?: HeaderVariant;
  style?: ViewStyle;
}


