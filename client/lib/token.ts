let accessToken: string | null = null;

export const setAccessTokenStore = (token: string | null) => {
  accessToken = token;
};

export const getAccessTokenStore = () => {
  return accessToken;
};
