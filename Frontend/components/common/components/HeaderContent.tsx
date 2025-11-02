import React from 'react';
import { View as RNView, StyleSheet } from 'react-native';
import { Text } from '../../Themed';
import { FontAwesome } from '@expo/vector-icons';
import { HeaderVariant, HeaderVariantStyles } from '../types';
import { TITLE_ICON_MARGIN } from '../constants';

interface HeaderContentProps {
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

export function HeaderContent({
  title,
  subtitle,
  variantStyles,
  textStyles,
  showBackButton,
  centered,
  showIcon,
  iconSize,
  iconColor,
}: HeaderContentProps) {
  return (
    <RNView
      style={[
        styles.textContainer,
        showBackButton && !centered && styles.textContainerWithBack,
        centered && styles.textContainerCentered,
      ]}
    >
      <RNView style={styles.titleContainer}>
        {showIcon && (
          <FontAwesome
            name="building"
            size={iconSize}
            color={iconColor}
            style={styles.titleIcon}
          />
        )}
        <Text
          style={[
            styles.title,
            {
              color: textStyles.color,
              fontSize: variantStyles.titleSize,
              textAlign: centered ? 'center' : 'left',
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </RNView>
      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            {
              color: textStyles.subtitleColor,
              fontSize: variantStyles.subtitleSize,
              textAlign: centered ? 'center' : 'left',
            },
          ]}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      )}
    </RNView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainerCentered: {
    alignItems: 'center',
  },
  textContainerWithBack: {
    alignItems: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleIcon: {
    marginRight: TITLE_ICON_MARGIN,
  },
  title: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },
});

