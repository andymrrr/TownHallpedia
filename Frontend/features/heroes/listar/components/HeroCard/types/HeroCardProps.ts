import { ViewStyle } from 'react-native';
import { HeroRole } from './HeroRole';

/**
 * Props del componente HeroCard
 */
export interface HeroCardProps {
  id?: number;
  nombre: string;
  rol?: HeroRole;
  nivelRequeridoTH?: number;
  nivelMaximo?: number;
  danoPorSegundo?: number;
  vida?: number;
  habilidad?: string;
  descripcion?: string;
  iconoUrl?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

