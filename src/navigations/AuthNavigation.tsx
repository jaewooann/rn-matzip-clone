import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignupScreen from '@/screens/auth/SignupScreen';
import {createStaticNavigation} from '@react-navigation/native';
import {colors} from '@/constants/colors';
import useThemeStore from '@/store/theme';

const Stack = createStackNavigator();

function AuthNavigation() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors[theme].BLACK,
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_500,
        },
        headerTitleStyle: {
          fontSize: 16,
        },
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
      }}>
      <Stack.Screen
        name="AuthHome"
        component={AuthHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: '회원가입'}}
      />
    </Stack.Navigator>
  );
}

// const AuthStack = createStackNavigator({
//   screenOptions: {
//     headerTitleAlign: 'center',
//     headerBackButtonDisplayMode: 'minimal',
//     headerTintColor: colors.BLACK,
//     headerStyle: {
//       backgroundColor: colors.WHITE,
//       shadowColor: colors.GRAY_500,
//     },
//     headertitlestyle: {
//       fontSize: 16,
//     },
//     cardStyle: {
//       backgroundColor: 'white',
//     },
//   },
//   screens: {
//     AuthHome: {
//       screen: AuthHomeScreen,
//       options: {
//         headerShown: false,
//       },
//     },
//     Login: {
//       screen: LoginScreen,
//       options: {
//         title: '로그인',
//       },
//     },
//     Signup: {
//       screen: SignupScreen,
//       options: {
//         title: '회원가입',
//       },
//     },
//   },
// });

// const AuthNavigation = createStaticNavigation(AuthStack);

export default AuthNavigation;
