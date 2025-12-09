import {createStackNavigator} from '@react-navigation/stack';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddLocationScreen from '@/screens/map/AddLocationScreen';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';
import {colors} from '@/constants/colors';

export const MapStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.BLACK,
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.GRAY_500,
    },
    headertitlestyle: {
      fontSize: 16,
    },
  },
  screens: {
    MapHome: {
      screen: MapHomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddLocation: {
      screen: AddLocationScreen,
      options: {
        title: '장소 추가',
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      },
    },
    SearchLocation: {
      screen: SearchLocationScreen,
    },
  },
});
