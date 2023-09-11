import Cookies from "js-cookie";

const getAccessToken = () => {
  return Cookies.get("access-token");
};

const updateAccessToken = (accessToken) => {
  Cookies.set("access-token", accessToken);
};

const setTokens = (access_token) => {
  Cookies.set("access-token", access_token);
};

const setGoogleUser = (user, date) => {
  Cookies.set("google-user", JSON.stringify({ ...user, lastCheckedAt: date }));
};

const getGoogleUser = () => {
  return JSON.parse(Cookies.get("google-user") ?? null);
};

const removeData = () => {
  Cookies.remove("access-token");
  Cookies.remove("userId");
  Cookies.remove("google-user");
};

const TokenService = {
  removeData,
  getAccessToken,
  setTokens,
  updateAccessToken,
  setGoogleUser,
  getGoogleUser,
};
export default TokenService;
