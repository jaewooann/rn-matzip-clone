import React from 'react';
import {ActionSheet} from '../common/ActionSheet';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/types/navigation';

interface FeedDetailActionSheetProps {
  id: number;
  isVisible: boolean;
  hideAction: () => void;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

const FeedDetailActionSheet = ({
  id,
  isVisible,
  hideAction,
}: FeedDetailActionSheetProps) => {
  const navigation = useNavigation<Navigation>();
  const deletePost = useMutateDeletePost();

  // 삭제 핸들러
  const handleDeletePost = () => {
    Alert.alert('삭제하시겠습니까?', '피드와 지도에서 모두 삭제됩니다.', [
      {
        text: '삭제',
        onPress: () => {
          deletePost.mutate(id, {
            onSuccess: () => {
              hideAction();
              navigation.goBack();
            },
          });
        },
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  // 수정 핸들러
  const handleEditPost = () => {
    navigation.navigate('EditLocation', {id});
    hideAction();
  };

  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button onPress={handleEditPost}>
            수정하기
          </ActionSheet.Button>
        </ActionSheet.Container>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
};

export default FeedDetailActionSheet;
