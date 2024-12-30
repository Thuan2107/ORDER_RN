import type { AxiosError, AxiosResponse } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { BaseResponse } from '../common/base-response';
import { ApiOauthRouter, ApiPort } from '../common/api-url';

type Response = any;

export const useSession = createQuery<Response, AxiosError>({
  queryKey: ['sessions'],
  fetcher: () => getSessionsApi(),
});

export const getSessionsApi = async (): Promise<BaseResponse<any>> => {
  try {
    const url = ApiOauthRouter.API_GET_SESSIONS;
    const response: AxiosResponse<BaseResponse<any>> = await client.get(url, {
      headers: {
        ProjectId: ApiPort.OAUTH_PORT,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
