import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';

const FeedFavoriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoriteList />
    </SafeAreaView>
  );
};

export default FeedFavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
