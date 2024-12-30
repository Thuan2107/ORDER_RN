import type { AxiosError, AxiosResponse } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import { client } from '../common';
import { BaseResponse, isSuccess } from '../common/base-response';
import { ApiOauthRouter, ApiPort } from '../common/api-url';
import { getBasicToken } from '@/lib/auth/utils';
import { encodePasswordToBase64 } from '@/components/ui';
import { signIn } from '@/lib';
import { useRouter } from 'expo-router';

type Response = any;
type Variables = {
  username: string;
  password: string;
};

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async ({ username, password }) => loginApi(username, password),
});

export const loginApi = async (
  username: string,
  password: string
): Promise<BaseResponse<any>> => {
  try {
    const url = ApiOauthRouter.API_LOGIN;
    const token = getBasicToken();
    console.log('token', token);

    const response: AxiosResponse<BaseResponse<any>> = await client.post(
      url,
      {
        username,
        password: encodePasswordToBase64(password),
        os_name: 'android_order',
        app_type: 11,
        device_name: '',
        device_uid: '',
      },
      {
        headers: {
          Authorization: token,
          ProjectId: ApiPort.OAUTH_PORT,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
