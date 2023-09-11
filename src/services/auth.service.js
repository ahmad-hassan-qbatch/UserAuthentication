import { setUserId, verifyGoogleAccessToken } from "./user.service";

import TokenService from "./token.service";
import api from "./api";
import { googleLogout } from "@react-oauth/google";
import moment from "moment";

const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", {
      username: username,
      password: password,
    });
    if (response.data.token) {
      TokenService.setTokens(response.data.token);
      setUserId(response.data.id);
    }
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

const isAuthenticated = async () =>
  TokenService.getAccessToken() || (await verifyGoogleAgain()) ? true : false;

const verifyGoogleAgain = async () => {
  const user = TokenService.getGoogleUser();

  if (!user) {
    return false;
  }

  const limit = moment().diff(moment(user.lastCheckedAt), "s");

  if (limit <= parseInt(import.meta.env.VITE_GOOGLE_RECHECK_LIMIT) * 60) {
    return true;
  }

  try {
    await verifyGoogleAccessToken(user.access_token);
    TokenService.setGoogleUser(user, new Date(moment()));

    return true;
  } catch (error) {
    return false;
  }
};

const logout = () => {
  if (TokenService.getGoogleUser()) {
    googleLogout();
  }

  TokenService.removeData();
};

export { login, isAuthenticated, logout };
