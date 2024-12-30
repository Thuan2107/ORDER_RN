import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';
import { Button, ControlledInput, Text, View } from '@/components/ui';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
import logo from '../../assets/techres-logo.png';
import background from '../../assets/background-login.png';

const schema = z.object({
  brand: z.string({ required_error: 'Vui lòng nhập thương hiệu' }),
  username: z.string({
    required_error: 'Vui lòng nhập tên tài khoản',
  }),
  password: z
    .string({
      required_error: 'Vui lòng nhập mật khẩu',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

const SPACING = 16;
export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      brand: 'mtres1o3',
      username: 'tr000001',
      password: 'abc123',
    }
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <ImageBackground
        source={background}
        className="flex-1"
        style={{ padding: SPACING * 2, paddingTop: SPACING * 15 }}
      >
        <View
          className="items-center justify-center"
          style={{ marginBottom: SPACING * 4 }}
        >
          <Image source={logo} />
        </View>

        <View style={{ gap: SPACING }}>
          <ControlledInput
            testID="name"
            control={control}
            name="brand"
            placeholder="Thương hiệu"
          />

          <ControlledInput
            testID="email-input"
            control={control}
            name="username"
            placeholder="Tài khoản"
          />
          <ControlledInput
            testID="password-input"
            control={control}
            name="password"
            placeholder="Mật khẩu"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View
            style={{
              backgroundColor: isValid ? '#C7D9EC' : '#C5C6C9',
              marginVertical: SPACING * 2,
              paddingHorizontal: 0,
            }}
            className="h-[62px] items-center justify-center rounded-2xl"
          >
            <Text
              className="text-[20px] font-bold uppercase w-full text-center"
              style={{ color: isValid ? '#1462B0' : 'white' }}
            >
              Đăng nhập
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-[#1462B0] text-[16px] font-medium text-center">
            Bạn quên mật khẩu
          </Text>
        </TouchableOpacity>
        {/* <Button
          testID="login-button"
          label="Login"
          onPress={handleSubmit(onSubmit)}
        /> */}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
