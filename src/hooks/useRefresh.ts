import { useAuth } from './useAuth';
import { axios } from '../api/axios';

export const useRefresh = () => {
  const { setAuth } = useAuth();
  return async () => {
    try {
      const { data: axiosData } = await axios.get('auth/refresh', { withCredentials: true });
      setAuth(axiosData.data);
      return axiosData.data.accessToken;
    } catch (err) {
      window.localStorage.removeItem('stay-logged-in');
      console.log({ err });
    }
  };
}
