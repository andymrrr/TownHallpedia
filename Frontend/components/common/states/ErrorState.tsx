import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Pressable } from 'react-native';
import { Text } from '../../Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

import { ErrorStateProps } from './interfaces';
import { useErrorStateAnimations } from './hooks/useErrorStateAnimations';
import { ErrorIcon } from './components';

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Oops, algo salió mal',
  message = 'No se pudo cargar el contenido. Por favor, intenta de nuevo.',
  onRetry,
  retryLabel = 'Reintentar',
  size = 'medium',
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { shakeValue, iconScale } = useErrorStateAnimations();

  const iconSize = size === 'small' ? 48 : size === 'medium' ? 64 : 80;
  const titleSize = size === 'small' ? 18 : size === 'medium' ? 22 : 26;
  const messageSize = size === 'small' ? 14 : size === 'medium' ? 15 : 16;

  const errorColor = colorScheme === 'dark' ? '#FF6B6B' : '#E63946';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateX: shakeValue }],
          },
        ]}
      >
        <Animated.View style={styles.iconContainer}>
          <ErrorIcon errorColor={errorColor} size={Math.round(iconSize * 0.6)} scale={iconScale} />
        </Animated.View>

        <Text style={[styles.title, { color: colors.text, fontSize: titleSize }]}>
          {title}
        </Text>

        <Text style={[styles.message, { color: colors.text + 'CC', fontSize: messageSize }]}>
          {message}
        </Text>

        {onRetry && (
          <Pressable
            style={({ pressed }) => [
              styles.retryButton,
              {
                backgroundColor: errorColor,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={onRetry}
          >
            <FontAwesome name="refresh" size={16} color="#FFFFFF" />
            <Text style={styles.retryButtonText}>{retryLabel}</Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    minWidth: 140,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
