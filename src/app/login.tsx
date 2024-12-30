import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import {
  FocusAwareStatusBar,
  showSuccessMessage,
} from '@/components/ui';
import { useAuth } from '@/lib';
import { useConfig } from '@/api/auth/use-configs';
import { useSession } from '@/api/auth/use-sessions';
import { setBasicToken } from '@/lib/auth/utils';
import { useLogin } from '@/api/auth/use-login';
import { isSuccess } from '@/api/common/base-response';

export default function Login() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState<string>('');
  const signIn = useAuth.use.signIn();
  //gọi api lấy session
  const { refetch: fetchSession } = useSession({
    enabled: false,
  });
  //gọi api lấy config nhà hàng
  const { refetch: fetchConfig } = useConfig({
    variables: { restaurant_name: restaurantName },
    enabled: false, // Disable automatic fetch
  });
  //gọi api login
  const { mutate: login, isPending: isLoginPending } = useLogin();

  const handleLogin = (data) => {
    login(
      { username: data.username, password: data.password },
      {
        onSuccess: (data) => {
          if (isSuccess(data)) {
            showSuccessMessage('Đăng nhập thành công.');
            signIn({ access: data.data.access_token ?? '' });
            router.replace('/');
          }
        },
        onError: (error) => console.error('Login error occurred.', error),
      }
    );
  };

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    setRestaurantName(data.brand);
    try {
      const sessionResponse = await fetchSession();
      const configResponse = await fetchConfig();
      if (isSuccess(configResponse.data)) {
        setBasicToken(
          `Basic ${sessionResponse.data.data}:${configResponse.data.data?.api_key}`
        );
        handleLogin({ username: data.username, password: data.password });
      }
    } catch (error) {
      console.error('Error fetching configs:', error);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
