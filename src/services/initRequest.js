import axios from 'axios';
import { store } from 'states';

// services
import authService from './autService';

// redux
import { setLoading } from 'states/app/app.slice';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  timeout: 5000,
  showLoading: false
})

export default function initRequest() {
  let requestCount = 0;

  function decreaseRequestCount() {
    requestCount = requestCount - 1;
    if(requestCount === 0) {
      store.dispatch(setLoading(false));
    }
  }

  axiosInstance.interceptors.request.use(
    config => {
      if(config.showLoading) {
        // show loading
        requestCount = requestCount + 1;
        store.dispatch(setLoading(true));
      }
  
      // add x-auth-token
      const accessToken = authService.getAccessToken();
      if(accessToken) {
        config.headers['x-auth-token'] = accessToken;
      }
  
      return config;
    },
    error => {
      if(error.config.showLoading) {
        // hide loading
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  )
  
  axiosInstance.interceptors.response.use(
    res => {
      if(res.config.showLoading) {
        // hide loading
        decreaseRequestCount();
      }
      return res;
    },
    async error => {
      if((error?.config.showLoading) || error.code === 'ENCONNABORTED') {
        // hide loading
        decreaseRequestCount();
      }
  
      // handle request timeout
      if(error.code === 'ENCONNABORTED') {
        // hide loading
        decreaseRequestCount();
      }
  
      // handle refresh token & access token expire
      // const accessToken = authService.getAccessToken();
      // if(error.response.status === 401 && error.config._retry) {
      //   error.config._retry = true;
      //   try {
      //     const result = await axiosInstance.post('/auth/refreshToken', {
      //       refreshToken: accessToken
      //     })
      //     authService.setAccessToken(result.data.accessToken)
      //     axiosInstance.defaults.headers.common["x-auth-token"] = result.data.accessToken;
      //     return axiosInstance(error.config);
      //   } catch (err) {
      //     if(error.response?.data) {
      //       return Promise.reject(err.response?.data)
      //     }
      //     return Promise.reject(err);
      //   }
      // }
  
      // handle error
      switch(error.response?.status) {
        case 403: {
          // do something
          break;
        }
        case 400: {
          // do something
          break;
        }
        case 500: {
          // do something
          break;
        }
        default:
          break;
      }
  
      return Promise.reject(error.response);
    }
  )
}
