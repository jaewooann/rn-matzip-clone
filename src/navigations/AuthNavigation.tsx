import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '../screens/auth/AuthHomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import {createStaticNavigation} from '@react-navigation/native';

const AuthStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'gray',
    },
    headertitlestyle: {
      fontSize: 16,
    },
    cardStyle: {
      backgroundColor: 'white',
    },
  },
  screens: {
    AuthHome: {
      screen: AuthHomeScreen,
      // options: {
      //   headerShown: false,
      // },
    },
    Login: {
      screen: LoginScreen,
      options: {
        title: '로그인',
      },
    },
    Signup: {
      screen: SignupScreen,
      options: {
        title: '회원가입',
      },
    },
  },
});

const AuthNavigation = createStaticNavigation(AuthStack);

export default AuthNavigation;
