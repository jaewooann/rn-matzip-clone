import {createStackNavigator} from '@react-navigation/stack';
import FeedListScreen from '@/screens/feed/FeedListScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import EditLocationScreen from '@/screens/feed/EditLocationScreen';
import {colors} from '@/constants/colors';
import DrawerButton from '@/components/common/DrawerButton';
import ImageZoomScreen from '@/screens/feed/ImageZoomScreen';

export const FeedStack = createStackNavigator({
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
    FeedList: {
      screen: FeedListScreen,
      options: {
        title: '피드',
        headerLeft: () => <DrawerButton />,
      },
    },
    FeedDetail: {
      screen: FeedDetailScreen,
      options: {
        headerShown: false,
      },
    },
    FeedFavorite: {
      screen: FeedFavoriteScreen,
    },
    EditLocation: {
      screen: EditLocationScreen,
      options: {
        title: '장소 수정',
      },
    },
    ImageZoom: {
      screen: ImageZoomScreen,
      options: {
        headerShown: false,
      },
    },
  },
});
