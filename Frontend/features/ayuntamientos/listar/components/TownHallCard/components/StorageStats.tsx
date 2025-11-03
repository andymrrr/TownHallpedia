import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { formatNumber } from '../utils/townHallUtils';

interface StorageStatsProps {
  capacidadOro?: number;
  capacidadElixir?: number;
  capacidadOscuro?: number;
  textColor: string;
}

export function StorageStats({ capacidadOro, capacidadElixir, capacidadOscuro, textColor }: StorageStatsProps) {
  if (!capacidadOro && !capacidadElixir && !capacidadOscuro) return null;

  return (
    <View style={{ marginTop: 6 }}>
      <Text style={{ fontSize: 10, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5, color: textColor + 'CC' }}>
        Capacidad de Almacenamiento
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
        {capacidadOro ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 4 }}>
            <FontAwesome name="dollar" size={14} color="#FFD700" />
            <Text style={{ fontSize: 12, fontWeight: '500', color: textColor, marginLeft: 4 }}>
              {formatNumber(capacidadOro)}
            </Text>
          </View>
        ) : null}
        {capacidadElixir ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 4 }}>
            <FontAwesome name="tint" size={14} color="#9B59B6" />
            <Text style={{ fontSize: 12, fontWeight: '500', color: textColor, marginLeft: 4 }}>
              {formatNumber(capacidadElixir)}
            </Text>
          </View>
        ) : null}
        {capacidadOscuro ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 4 }}>
            <FontAwesome name="circle" size={14} color="#34495E" />
            <Text style={{ fontSize: 12, fontWeight: '500', color: textColor, marginLeft: 4 }}>
              {formatNumber(capacidadOscuro)}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
