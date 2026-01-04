import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import useThemeStore, {Theme} from '@/store/theme';

interface SettingItemProps extends PressableProps {
  title: string;
  color?: string;
}

const SettingItem = ({title, color, ...props}: SettingItemProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}>
      <Text style={[styles.titleText, {color: color ?? colors[theme].BLACK}]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: 15,
      backgroundColor: colors[theme].WHITE,
      borderColor: colors[theme].GRAY_200,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    pressedContainer: {
      backgroundColor: colors[theme].GRAY_200,
    },
    titleText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
  });

export default SettingItem;
