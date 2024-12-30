import { getItem, removeItem, setItem } from '@/lib/storage';

const ACCESS_TOKEN = 'token';
const BASIC_TOKEN = 'basic_token';

export type TokenType = {
  access: string;
};

export const getToken = () => getItem<string>(ACCESS_TOKEN);
export const removeToken = () => removeItem(ACCESS_TOKEN);
export const setToken = (value: string) => setItem<string>(ACCESS_TOKEN, value);

//basic token để login
export const setBasicToken = (value: string) => setItem<string>(BASIC_TOKEN, value);
export const getBasicToken = () => getItem<string>(BASIC_TOKEN);
