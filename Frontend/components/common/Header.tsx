import React from 'react';
import { StyleSheet, ViewStyle, View as RNView } from 'react-native';
import { View } from '../Themed';
import { BaseHeaderProps } from './types';
import { useHeaderStyles } from './hooks';
import { BACK_BUTTON_SIZE, BACK_ICON_SIZE } from './constants';
import { HeaderContent } from './components/HeaderContent';
import { HeaderBackButton } from './components/HeaderBackButton';

/**
 * Header simple sin SafeAreaView
 * Útil cuando ya estás dentro de un SafeAreaView o en contextos específicos
 */
export default function Header({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightAction,
  variant = 'default',
  style,
}: BaseHeaderProps) {
  const { colors, variantStyles, containerStyles, textStyles } = useHeaderStyles(variant);

  return (
    <View
      style={[
        styles.container,
        containerStyles,
        {
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      <RNView style={styles.content}>
        {showBackButton && (
          <HeaderBackButton
            onPress={onBackPress}
            iconColor={textStyles.color}
            iconSize={BACK_ICON_SIZE}
          />
        )}

        <HeaderContent
          title={title}
          subtitle={subtitle}
          variant={variant}
          variantStyles={variantStyles}
          textStyles={textStyles}
          showBackButton={showBackButton}
          centered={true}
          showIcon={false}
          iconSize={0}
          iconColor={textStyles.tintColor}
        />

        {rightAction && (
          <RNView style={styles.rightAction}>
            {rightAction}
          </RNView>
        )}
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  rightAction: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
