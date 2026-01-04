import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SettingItem from '@/components/setting/SettingItem';
import {colors} from '@/constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SettingStackParamList} from '@/types/navigation';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import DarkModeActionSheet from '@/components/setting/DarkModeActionSheet';
import useThemeStore from '@/store/theme';

type Navigation = NavigationProp<SettingStackParamList>;

const SettingHomeScreen = () => {
  const {theme} = useThemeStore();
  const {logoutMutation} = useAuth();
  const navigation = useNavigation<Navigation>();
  const darkModeAction = useModal();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="프로필 수정"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem title="다크 모드" onPress={darkModeAction.show} />
        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          color={colors[theme].RED_500}
          onPress={() => logoutMutation.mutate(null)}
        />

        <DarkModeActionSheet
          isVisible={darkModeAction.isVisible}
          hideAction={darkModeAction.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
