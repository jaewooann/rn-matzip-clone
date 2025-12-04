import axios from 'axios';
import {Platform} from 'react-native';

export const BASE_URL = {
  android: 'http://192.168.1.97:3030',
  ios: 'http://192.168.1.97:3030',
}; // 실기기는 내부 ip주소로 (데블록 와이파이 ip 주소임)

const axiosInstance = axios.create({
  baseURL: Platform.OS === 'android' ? BASE_URL.android : BASE_URL.ios,
});

export default axiosInstance;
