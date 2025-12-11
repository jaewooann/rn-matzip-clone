import React from 'react';
import {ActionSheet} from '../common/ActionSheet';

interface FeedDetailActionSheetProps {
  isVisible: boolean;
  hideAction: () => void;
}

const FeedDetailActionSheet = ({
  isVisible,
  hideAction,
}: FeedDetailActionSheetProps) => {
  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Container>
        <ActionSheet.Button isDanger>삭제하기</ActionSheet.Button>
        <ActionSheet.Divider />
        <ActionSheet.Button>수정하기</ActionSheet.Button>
      </ActionSheet.Container>
      <ActionSheet.Container>
        <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
      </ActionSheet.Container>
    </ActionSheet>
  );
};

export default FeedDetailActionSheet;
