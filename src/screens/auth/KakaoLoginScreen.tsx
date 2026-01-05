import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import Config from 'react-native-config';
import WebView, {WebViewNavigation} from 'react-native-webview';
import axios from 'axios';
import useAuth from '@/hooks/queries/useAuth';

const REDIRECT_URI = 'http://localhost:3030/auth/oauth/kakao';

const KakaoLoginScreen = () => {
  const {kakaoLoginMutation} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    kakaoLoginMutation.mutate(response.data.access_token);
  };

  const handleShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    if (isMatched) {
      const code = event.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(code);
      setIsLoading(event.loading);
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator size="large" />}
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KakaoLoginScreen;
