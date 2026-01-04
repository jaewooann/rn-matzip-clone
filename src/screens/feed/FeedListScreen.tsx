import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {Suspense} from 'react';
import FeedList from '@/components/feed/FeedList';
import Indicator from '@/components/common/Indicator';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

const FeedListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Indicator size="large" />}>
          <FeedList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
};

export default FeedListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
