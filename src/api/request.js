import axios from 'axios'

export default function request(config){
  const instance = axios.create({
    // baseURL:'http://www.ysqorz.top:8888/api/private/v1/',
    baseURL:'http://timemeetyou.com:8889/api/private/v1/',
    timeout: 5000
  })
  //2.axios拦截器
  //2.1请求拦截的作用

  instance.interceptors.request.use(config => {
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // console.log(config)
    return config
  }, err => {
    console.log(err);
  })

  //3.发送真正的请求
  return instance(config)
}