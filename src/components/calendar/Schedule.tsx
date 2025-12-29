import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';

interface ScheduleProps {
  subTitle: string;
  title: string;
  onPress: () => void;
}

const Schedule = ({subTitle, title, onPress}: ScheduleProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.line} />
      <View style={styles.infoContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.subTitleText}>
          {subTitle}
        </Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  line: {
    backgroundColor: colors.PINK_700,
    width: 6,
    height: 50,
    marginRight: 8,
    borderRadius: 20,
  },
  infoContainer: {
    justifyContent: 'space-evenly',
  },
  subTitleText: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Schedule;
