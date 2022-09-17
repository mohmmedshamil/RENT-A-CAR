import axios from "axios";
import {API_END_POINTS} from './apiEndPoints'
let serviceBase = axios.create({
  // baseURL:"http://localhost:81",
  baseURL:"http://localhost:5000",
  //  baseURL : window.location.origin,
  timeout: 180000,
  withCredentials: true,
  headers: {
    
// 'ENV':process.env.REACT_APP_ENV
  },
});

serviceBase.interceptors.request.use(function (config) {
  if(config.baseURL.includes('localhost'))
  // config.baseURL = "http://localhost:81"; 
  //  config.baseURL = window.location.origin;
      config.baseURL="http://localhost:5000";
      config.baseURL = config.baseURL + API_END_POINTS.VERSION;
  return config;
});

serviceBase.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (response.status === 200) {
    }
    return data;
  },
  (error) => {
    let { data } = error.response ? error.response : {};
    let customErr = {};
    if (error.message === "Network Error" && !error.response) {
      customErr = {
        message: "API is down, please try again later!",
        status: "FAILED",
      };
      data = customErr;
    }
    return Promise.reject(data);
  }
);

export default serviceBase;