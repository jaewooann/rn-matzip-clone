import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Post} from '@/types/domain';
import {BASE_URL} from '@/api/axios';
import {getDateWithSeparator} from '@/utils/date';
import {colors} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/types/navigation';
import useThemeStore, {Theme} from '@/store/theme';

interface FeedItemProps {
  post: Post;
}

const FeedItem = ({post}: FeedItemProps) => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('FeedDetail', {id: post.id})}>
      {post.imageUris.length > 0 && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: `${
                Platform.OS === 'ios' ? BASE_URL.ios : BASE_URL.android
              }/${post.imageUris[0].uri}`,
            }}
          />
        </View>
      )}

      {post.imageUris.length === 0 && (
        <View style={[styles.imageContainer, styles.emptyImageContainer]}>
          <Text style={styles.descriptionText}>No Image</Text>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.dateText}>
          {getDateWithSeparator(post.date, '/')}
        </Text>
        <Text style={styles.titleText}>{post.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={1}>
          {post.description}
        </Text>
      </View>
    </Pressable>
  );
};

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 5,
      marginVertical: 12,
    },
    imageContainer: {
      width: Dimensions.get('screen').width / 2 - 25,
      height: Dimensions.get('screen').width / 2 - 25,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      borderRadius: 5,
    },
    textContainer: {
      marginTop: 7,
      gap: 2,
    },
    dateText: {
      color: colors[theme].PINK_700,
      fontWeight: '600',
      fontSize: 12,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontWeight: '500',
      fontSize: 13,
    },
    descriptionText: {
      color: colors[theme].GRAY_500,
      fontSize: 13,
    },
  });

export default FeedItem;
