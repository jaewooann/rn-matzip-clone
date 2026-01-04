import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import useThemeStore from '@/store/theme';

const {theme} = useThemeStore();

const Indicator = ({
  size = 'small',
  color = colors[theme].GRAY_500,
}: ActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Indicator;
