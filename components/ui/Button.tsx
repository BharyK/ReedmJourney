import * as React from "react";
import { StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native';
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  icon?: React.ReactNode;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  gradientColors?: string[];
}

export const NormalButton: React.FC<Props> = ({
  icon,
  label,
  onPress,
  disabled,
  loading,
  style,
  gradientColors = ['#2328f3', '#4549ff'],
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[style, { borderRadius: 8, overflow: 'hidden' }]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={styles.label}>{label}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  icon: {
    marginRight: 8,
  },
});
