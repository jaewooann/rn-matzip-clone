import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils/validation';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import {errorMessages} from '@/constants/message';

const SignupScreen = () => {
  const {signupMutation, loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValues: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, password} = signup.values;

    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
        onError: error =>
          Toast.show({
            type: 'error',
            text1:
              error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
          }),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          submitBehavior="submit"
          returnKeyType="next"
          inputMode="email"
          touched={signup.touched.email}
          error={signup.errors.email}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호"
          submitBehavior="submit"
          returnKeyType="next"
          touched={signup.touched.password}
          error={signup.errors.password}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          // value={signup.values.password}
          // onChangeText={text => signup.handleChangeValue('password', text)}
          // onBlur={() => signup.handleBlur('password')}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          secureTextEntry
          textContentType="oneTimeCode"
          placeholder="비밀번호 확인"
          returnKeyType="done"
          touched={signup.touched.passwordConfirm}
          error={signup.errors.passwordConfirm}
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton
        label="회원가입"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});
