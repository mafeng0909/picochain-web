import Vue from 'vue'
import axios from 'axios'
import config from './config'
import qs from "qs";

axios.defaults.baseURL = config.api; // 设置axios的基础请求路径
axios.defaults.timeout = 2000; // 设置axios的请求时间
axios.defaults.withCredentials = true;

axios.loadData = async function (url) {
  const resp = await axios.get(url);
  return resp.data;
}

Vue.prototype.$http = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象
Vue.prototype.$qs = qs;
