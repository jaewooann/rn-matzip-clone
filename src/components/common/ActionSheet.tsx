import {colors} from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import {createContext, PropsWithChildren, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface ActionSheetContextValue {
  onPressOutside?: (event: GestureResponderEvent) => void;
}

const ActionSheetContext = createContext<ActionSheetContextValue | undefined>(
  undefined,
);

interface ActionMainProps extends ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  hideAction: () => void;
  animationType?: ModalProps['animationType'];
}

function ActionMain({
  children,
  isVisible,
  animationType = 'slide',
  hideAction,
  ...props
}: ActionMainProps) {
  const onPressOutside = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideAction();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType}
      onRequestClose={hideAction}
      {...props}>
      <ActionSheetContext value={{onPressOutside}}>
        {children}
      </ActionSheetContext>
    </Modal>
  );
}

function Background({children}: PropsWithChildren) {
  const actionSheetContext = useContext(ActionSheetContext);

  return (
    <SafeAreaView
      style={styles.actionBackground}
      onTouchEnd={actionSheetContext?.onPressOutside}>
      {children}
    </SafeAreaView>
  );
}

function Container({children}: PropsWithChildren) {
  return <View style={styles.actionContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
  onPress?: () => void;
}

function Button({
  children,
  isDanger = false,
  isChecked = false,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.actionButtonPressed,
        styles.actionButton,
      ]}
      onPress={onPress}>
      <Text style={[styles.actionText, isDanger && styles.dangerText]}>
        {children}
      </Text>

      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors.BLUE_500} />
      )}
    </Pressable>
  );
}

function Title({children}: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.border} />;
}

export const ActionSheet = Object.assign(ActionMain, {
  Container,
  Button,
  Title,
  Background,
  Divider,
});

const styles = StyleSheet.create({
  actionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  actionContainer: {
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  actionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  actionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors.RED_500,
  },
  titleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: '500',
  },
  border: {
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
});
