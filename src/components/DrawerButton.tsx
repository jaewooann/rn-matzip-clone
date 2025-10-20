import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/types/navigation';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

const DrawerButton = ({color = colors.BLACK}) => {
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable style={styles.container} onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={25} color={color} />
    </Pressable>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});
