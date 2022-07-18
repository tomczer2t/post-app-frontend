import { useRefresh } from './useRefresh';
import { useAuth } from './useAuth';
import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';

export const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
          if (config.headers && !config?.headers?.['authorization']) {
            config.headers['authorization'] = `Bearer ${ auth?.accessToken }`
          }
          return config;
      },
      (err) => Promise.reject(err)
    );
    const resInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['authorization'] = `Bearer ${ newAccessToken }`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    )

    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(resInterceptor);
    }
  }, [auth, refresh]);
  return axiosPrivate;
}
