import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import useAuth from '@/hooks/queries/useAuth';
import AuthNavigation from '@/navigations/AuthNavigation';
import DrawerNavigation from '@/navigations/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';

const RootNavigation = () => {
  const {isLogin} = useAuth();

  return (
    <RetryErrorBoundary>
      <NavigationContainer>
        {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </RetryErrorBoundary>
  );
};

export default RootNavigation;
