import { useMemo } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { HeaderVariant } from '../types';
import { HEADER_VARIANT_STYLES, COMPACT_HEADER_PADDING } from '../constants';

export const useHeaderStyles = (variant: HeaderVariant = 'default') => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const variantStyles = useMemo(
    () => HEADER_VARIANT_STYLES[variant],
    [variant]
  );

  const containerStyles = useMemo(
    () => ({
      backgroundColor: colors.background,
      paddingTop: variant === 'compact' ? COMPACT_HEADER_PADDING.top : variantStyles.paddingVertical,
      paddingBottom:
        variant === 'compact'
          ? COMPACT_HEADER_PADDING.bottom
          : variantStyles.paddingVertical,
    }),
    [variant, variantStyles.paddingVertical, colors.background]
  );

  const textStyles = useMemo(
    () => ({
      color: colors.text,
      subtitleColor: colors.text + 'CC',
      tintColor: colors.tint,
    }),
    [colors]
  );

  return {
    colors,
    variantStyles,
    containerStyles,
    textStyles,
  };
};
