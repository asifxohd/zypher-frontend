import axios from 'axios';
import jsCookies from 'js-cookie';

const axiosInstance = axios.create({
  withCredentials: true // Include cookies in requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = jsCookies.get('accessToken');
    const refreshToken = jsCookies.get('refreshToken');

    console.log(accessToken);
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // if (refreshToken) {
    //   config.headers['Refresh-Token'] = refreshToken;
    // }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export default axiosInstance;
