import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import DrawerButton from '@/components/DrawerButton';
import useAuth from '@/hooks/queries/useAuth';
const MapHomeScreen = () => {
  const {logoutMutation} = useAuth();

  return (
    <SafeAreaView>
      <Text>MapHomeScreen</Text>
      <DrawerButton />
      <Text onPress={() => logoutMutation.mutate(null)}>로그아웃</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default MapHomeScreen;
