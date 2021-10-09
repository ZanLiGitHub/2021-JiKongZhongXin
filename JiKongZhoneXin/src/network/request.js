//公共的axios实例
import axios from 'axios';

export function request(config){
    const instance = axios.create({
      baseURL: '/data',
      timeout: 5000,
    })

    //请求拦截
    instance.interceptors.request.use(
        config=>{
            //如果有接口需要认证, 统一设置
            // const token = window.localStorage.getItem('token');
            // if(token !== ' '){
            //     config.headers.Authorization = 'Bearer '+token;
            // }
            //直接放行
          return config;
    },
        err=>{})

    //响应拦截
    instance.interceptors.response.use(
        res=>{
            //直接放行
          return res.data ? res.data : res;
        },
        err=>{
        }
    )

    return instance(config)
}
