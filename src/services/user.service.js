import TokenService from "./token.service";
import api from "./api";
import axios from "axios";

export const getUser = async () => {
  const googleUser = TokenService.getGoogleUser();
  if (googleUser) {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`
    );
    return {
      name: data.name,
      email: data.email,
      picture: data.picture,
      ...data,
    };
  } else {
    const { data } = await api.get(`/auth/users/${getUserId()}`);

    return {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      picture: data.image,
      ...data,
    };
  }
};

export const verifyGoogleAccessToken = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const data = response.data;
    if (data?.audience !== import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      throw new Error("Invalid audience");
    }

    return data;
  } catch (error) {
    console.error("Error verifying access token:", error.message);
    throw error;
  }
};

export const setUserId = (id) => {
  localStorage.setItem("userId", id);
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};
