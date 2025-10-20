import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/types/navigation';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

const FeedDetailScreen = ({route}: Props) => {
  const {id} = route.params;

  return (
    <SafeAreaView>
      <Text>FeedDetailScreen {id}</Text>
    </SafeAreaView>
  );
};

export default FeedDetailScreen;

const styles = StyleSheet.create({});
