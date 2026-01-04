import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import DrawerButton from '@/components/common/DrawerButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import useUserLocation from '@/hooks/useUserLocation';
import {numbers} from '@/constants/numbers';
import usePermission from '@/hooks/usePermission';
import Toast from 'react-native-toast-message';
import CustomMarker from '@/components/common/CustomMarker';
import useMoveMapView from '@/hooks/useMoveMapView';
import MapIconButton from '@/components/map/MapIconButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/types/navigation';
import useGetMarkers from '@/hooks/useGetMarkers';
import MarkerModal from '@/components/map/MarkerModal';
import useModal from '@/hooks/useModal';
import useLocationStore from '@/store/location';
import MarkerFilterAction from '@/components/map/MarkerFilterAction';
import useFilterStore from '@/store/filter';
import useThemeStore, {Theme} from '@/store/theme';

type Navigation = StackNavigationProp<MapStackParamList>;

const MapHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const inset = useSafeAreaInsets();
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {userLocation, isUserLocationError} = useUserLocation();
  const {selectLocation, setSelectLocation} = useLocationStore();
  const {filters} = useFilterStore();
  const [markerId, setMarkerId] = useState<number | null>(null);
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const {data: markers = []} = useGetMarkers({
    select: data =>
      data.filter(
        marker =>
          filters[marker.color] === true &&
          filters[String(marker.score)] === true,
      ),
  });

  const filterAction = useModal();
  const markerModal = useModal();

  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      // 위치 권한을 허용해주세요.
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }
    moveMapView(userLocation);
  };

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    setMarkerId(id);
    moveMapView(coordinate);
    markerModal.show();
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요.',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
      return;
    }

    navigation.navigate('AddLocation', {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors[theme].WHITE}
      />
      <MapView
        userInterfaceStyle={theme}
        googleMapId="404be0729fdf48297b7f2bd5"
        ref={mapRef}
        style={styles.container}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        onRegionChangeComplete={handleChangeDelta}
        provider={PROVIDER_GOOGLE}
        onLongPress={({nativeEvent}) =>
          setSelectLocation(nativeEvent.coordinate)
        }>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton
          name="magnifying-glass"
          onPress={() => navigation.navigate('SearchLocation')}
        />
        <MapIconButton name="filter" onPress={filterAction.show} />
        <MapIconButton name="plus" onPress={handlePressAddPost} />
        <MapIconButton
          name="location-crosshairs"
          onPress={handlePressUserLocation}
        />
      </View>

      <MarkerModal
        markerId={Number(markerId)}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />

      <MarkerFilterAction
        isVisible={filterAction.isVisible}
        hideAction={filterAction.hide}
      />
    </>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerButton: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: colors[theme].PINK_700,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    },
    buttonList: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      zIndex: 1,
    },
  });

export default MapHomeScreen;
