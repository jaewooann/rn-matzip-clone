import {NavigatorScreenParams} from '@react-navigation/native';

export type MapStackParamList = {
  MapHome: undefined;
  AddLocation: undefined;
  SearchLocation: undefined;
};

export type AuthStackParamList = {
  AuthHome: undefined;
  Login: undefined;
  Signup: undefined;
};

export type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: {id: number};
  FeedFavorite: undefined;
  EditLocation: {id: number};
};

export type MainDrawerParamList = {
  Map: NavigatorScreenParams<MapStackParamList>;
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Calendar: undefined;
};

// 전역 타입 커스터마이징
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainDrawerParamList {}
  }
}
