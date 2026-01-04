import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import {isSameAsCurrentDate, MonthYear} from '@/utils/date';
import DayOfWeeks from './DayOfWeeks';
import DateBox from './DateBox';
import {ResponseCalendarPost} from '@/api/post';
import useThemeStore, {Theme} from '@/store/theme';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
  selectedDate: number;
  onPressDate: (date: number) => void;
  schedules: ResponseCalendarPost;
}

const Calendar = ({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
  schedules,
}: CalendarProps) => {
  const {month, year, startDate, firstDOW, lastDate} = monthYear;
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(-1)}>
          <Ionicons name="arrow-back" size={25} color={colors[theme].BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>
            {year}년 {month}월
          </Text>
        </Pressable>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(1)}>
          <Ionicons
            name="arrow-forward"
            size={25}
            color={colors[theme].BLACK}
          />
        </Pressable>
      </View>

      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, index) => ({
            id: index,
            date: index - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              hasSchedule={!!schedules[item.date]}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 25,
      marginVertical: 16,
    },
    monthYearContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    monthButton: {
      padding: 10,
    },
    monthYearText: {
      fontSize: 18,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
    bodyContainer: {
      backgroundColor: colors[theme].GRAY_100,
      borderBottomColor: colors[theme].GRAY_300,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

export default Calendar;
