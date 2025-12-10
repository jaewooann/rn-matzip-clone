import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import FeedList from '@/components/feed/FeedList';

const FeedListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
};

export default FeedListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
