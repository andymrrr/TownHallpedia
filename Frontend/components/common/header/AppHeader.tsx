import React from 'react';
import { StyleSheet, View as RNView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeaderProps } from '@/components/common/header/interfaces';
import { useHeaderStyles } from './hooks/useHeaderStyles';
import { BACK_BUTTON_SIZE, TITLE_ICON_SIZE, BACK_ICON_SIZE } from '@/components/common/header/constants';
import { HeaderContent } from './components';
import { HeaderBackButton } from './components';

export default function AppHeader({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightAction,
  variant = 'large',
  style,
  centered = true,
}: AppHeaderProps) {
  const { colors, variantStyles, containerStyles, textStyles } = useHeaderStyles(variant);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <RNView style={[styles.container, containerStyles, style]}>
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
            centered={centered}
            showIcon={variant === 'compact'}
            iconSize={TITLE_ICON_SIZE}
            iconColor={textStyles.tintColor}
          />

          <RNView style={styles.rightAction}>
            {rightAction || (showBackButton && <RNView style={{ width: BACK_BUTTON_SIZE }} />)}
          </RNView>
        </RNView>
      </RNView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rightAction: {
    width: BACK_BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
