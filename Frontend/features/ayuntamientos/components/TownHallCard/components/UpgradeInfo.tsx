import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { formatNumber, formatTimeHours } from '../utils/townHallUtils';

interface UpgradeInfoProps {
  costoMejora?: number;
  tipoRecurso?: string;
  tiempoConstruccion?: number;
  tintColor: string;
  textColor: string;
}

export function UpgradeInfo({ costoMejora, tipoRecurso, tiempoConstruccion, tintColor, textColor }: UpgradeInfoProps) {
  if (!costoMejora && !tiempoConstruccion) return null;

  return (
    <View style={{ marginTop: 6 }}>
      <Text style={{ fontSize: 10, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5, color: textColor + 'CC' }}>
        Información de Mejora
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
        {costoMejora ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 4 }}>
            <FontAwesome name="money" size={12} color={tintColor} />
            <Text style={{ fontSize: 11, color: textColor, marginLeft: 4 }} numberOfLines={1}>
              {formatNumber(costoMejora)} {tipoRecurso || 'Oro'}
            </Text>
          </View>
        ) : null}
        {tiempoConstruccion ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 4 }}>
            <FontAwesome name="clock-o" size={12} color={tintColor} />
            <Text style={{ fontSize: 11, color: textColor, marginLeft: 4 }}>
              {formatTimeHours(tiempoConstruccion)}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
