import type { AxiosError, AxiosResponse } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { BaseResponse } from '../common/base-response';
import { ApiOauthRouter, ApiPort } from '../common/api-url';

type Variables = { restaurant_name: string };
type Response = any;

export const useConfig = createQuery<Response, Variables, AxiosError>({
  queryKey: ['configs'],
  fetcher: ({ restaurant_name }) => getConfigsApi(restaurant_name),
  enabled: false, // Disable automatic fetch
});

export const getConfigsApi = async (
  restaurant_name: string
): Promise<BaseResponse<any>> => {
  try {
    const url = ApiOauthRouter.API_GET_CONFIGS;
    const response: AxiosResponse<BaseResponse<any>> = await client.get(url, {
      params: {
        project_id: 'net.techres.order.api',
        restaurant_name,
      },
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
