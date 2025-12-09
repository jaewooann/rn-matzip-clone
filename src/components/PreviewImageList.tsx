import {Image, Platform, Pressable, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {ImageUri} from '@/types/domain';
import {BASE_URL} from '@/api/axios';

interface PreviewImageListProps {
  imageUris: ImageUri[];
}

const PreviewImageList = ({imageUris}: PreviewImageListProps) => {
  return (
    <ScrollView horizontal>
      {imageUris.map(({uri}) => {
        return (
          <Pressable key={uri} style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios' ? BASE_URL.ios : BASE_URL.android
                }/${uri}`,
              }}
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PreviewImageList;
