import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/types/navigation';

type Navigation = StackNavigationProp<FeedStackParamList>;

const FeedListScreen = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView>
      <Text>FeedListScreen</Text>
      <Text onPress={() => navigation.navigate('FeedDetail', {id: 1})}>
        1번 장소
      </Text>
    </SafeAreaView>
  );
};

export default FeedListScreen;

const styles = StyleSheet.create({});
