import { axiosInstance } from './axiosInstanceWithTokenCheck';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export const checkRefreshToken = async (accessToken) => {
  try {
    const result = await axiosInstance(accessToken).post(`${import.meta.env.VITE_BE_API_URL}/login/check-refresh-token`);
    if (result.status === 200) {
      const newAccessToken = result.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      // set csrf token
      const csrf_token = uuidv4();
      Cookies.set('X-CSRF-Token', csrf_token, { secure: true, sameSite: 'strict' });
      return newAccessToken; // Return the new access token
    }
  } catch (error) {
    if (error.response && (error.response.status === 400 || error.response.status === 401)) {

      localStorage.removeItem("accessToken");
      Cookies.remove('X-CSRF-Token');
      return null; // Return null if there's an error
    }
  }
};