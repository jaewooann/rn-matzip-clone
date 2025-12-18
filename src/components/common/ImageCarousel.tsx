import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ImageUri} from '@/types/domain';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BASE_URL} from '@/api/axios';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex: number;
}

const ImageCarousel = ({images, pressedIndex = 0}: ImageCarouselProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const deviceWidth = Dimensions.get('window').width;
  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [page, setPage] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);

    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, {marginTop: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color={colors.WHITE} />
      </Pressable>

      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? BASE_URL.ios : BASE_URL.android
                }/${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(pressedIndex);
        }}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />

      <View style={[styles.pageContainer, {bottom: insets.bottom + 10}]}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[styles.pageDot, index === page && styles.currentPageDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BLACK,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  pageDot: {
    margin: 4,
    backgroundColor: colors.WHITE,
    width: 8,
    height: 8,
    borderRadius: 8,
  },
  currentPageDot: {
    backgroundColor: colors.PINK_700,
  },
});

export default ImageCarousel;
