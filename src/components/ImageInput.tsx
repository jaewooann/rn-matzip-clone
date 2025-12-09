import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';

interface ImageInputProps {
  onChange: () => void;
}

const ImageInput = ({onChange}: ImageInputProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}
      onPress={onChange}>
      <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text style={styles.inputText}>사진 추가</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: colors.GRAY_300,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    gap: 5,
  },
  inputText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  imageInputPressed: {
    opacity: 0.5,
  },
});

export default ImageInput;
