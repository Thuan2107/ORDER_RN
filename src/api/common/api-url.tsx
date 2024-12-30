export const ApiPort = {
  OAUTH_PORT: 8003,
  ORDER_LEVEL_ONE: 8004,
};

export const ApiOauthRouter = {
  VERSION: 'v10',
  get API_GET_CONFIGS() {
    return `api/${this.VERSION}/configs`;
  },

  get API_GET_SESSIONS() {
    return `api/${this.VERSION}/sessions`;
  },

  get API_LOGIN() {
    return `api/${this.VERSION}/employees/login`;
  },
};
