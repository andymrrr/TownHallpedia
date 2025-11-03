import { HeaderVariant, HeaderVariantStyles } from '../types';

export interface HeaderContentProps {
  title: string;
  subtitle?: string;
  variant: HeaderVariant;
  variantStyles: HeaderVariantStyles;
  textStyles: {
    color: string;
    subtitleColor: string;
    tintColor: string;
  };
  showBackButton: boolean;
  centered: boolean;
  showIcon: boolean;
  iconSize: number;
  iconColor: string;
}


