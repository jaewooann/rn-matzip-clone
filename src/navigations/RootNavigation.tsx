import AuthNavigation from '@/navigations/AuthNavigation';
import DrawerNavigation from '@/navigations/DrawerNavigation';

const RootNavigation = () => {
  const isLogin = true;

  return <>{isLogin ? <DrawerNavigation /> : <AuthNavigation />}</>;
};

export default RootNavigation;
