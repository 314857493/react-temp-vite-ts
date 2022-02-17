/* eslint-disable @typescript-eslint/no-shadow */
import axios from "axios";
import type { AxiosInstance, Axios } from "axios";
import { message } from "antd";
import { goLogin } from "./index";

const config = {
  baseURL: "/api",
  timeout: 10 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config) as AxiosInstance & {
  upload: Axios["post"];
};
// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    if (code && code !== 1) {
      message.warning(response.data.message || response.data.msg);
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, config, data } = error.response;
      if (config.url !== "/cms/system/login") {
        if (status === 401) {
          goLogin();
        } else {
          message.error(data.data || data.message);
        }
      }
    } else {
      message.error(error.toString());
    }
    return Promise.reject(error);
  }
);
_axios.upload = (url: string, data: any) => {
  const form = new FormData();
  Object.keys(data).forEach((val) => {
    form.append(val, data[val]);
  });
  return _axios.post(url, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export default _axios;
