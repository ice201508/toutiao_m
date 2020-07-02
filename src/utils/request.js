import axios from 'axios';
import store from '@/store';
import jsonbig from 'json-bigint';
import Qs from 'qs';
import router from '../router';

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/',
  baseURL: '/tt',
  // baseURL: 'https://api.leijiuling.com',
  timeout: 1000,
  responseType: 'json',
  // 跨域请求要想带上cookie，必须要在ajax请求里加上withCredentials
  // withCredentials: true
  // transformRequest: [
  //   function(data, headers) {
  //     console.log('所有请求发出去之前：', data, headers);
  //     return data;
  //   }
  // ],
  // paramsSerializer: function(params) {
  //   console.log(123, params, Qs.stringify(params));
  //   // https://www.cnblogs.com/small-coder/p/9115972.html
  //   return Qs.stringify(params, { arrayFormat: 'brackets' });
  // },
  transformResponse: [
    function(data) {
      // 用 json去解析的话,超过53位的整形会出现精度丢失的问题，而json-bigint会将其转化为一个BigNumber对象
      try {
        return jsonbig.parse(data);
      } catch (err) {
        return data;
      }
    }
  ]
  // transformResponse: [
  //   function(res) {
  //     if (typeof res === 'string') {
  //       try {
  //         res = JSON.parse(res.data);
  //       } catch (e) {}
  //     }
  //     // 这个函数如果写上，后面就会得到的是一个字符串
  //     console.log('1所有请求返回到达then之前:', res);
  //     return res;
  //   }
  // ]
});

request.interceptors.request.use(
  function(config) {
    const storage_token = store.state;
    console.log('请求拦截器访问$store: ', storage_token);
    if (storage_token && storage_token.token) {
      config.headers.Authorization = 'Bearer ' + storage_token.token.token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function(response) {
    console.log('2相应拦截器', response.data);
    return response.data;
  },
  function(error) {
    // 在这里对token过期的 逻辑处理
    if (error.response && error.response.status === 401) {
      // 进入了这个函数，说明token已经过期了
      const token_storage = store.state;
      if (!token_storage || !token_storage.token.refresh_token) {
        // 如果不存在refresh_token这个值
        router.push('/login');
        return;
      }

      // 下面就是对token过期的处理, 刷新用户token
      try {
        axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          method: 'put',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token_storage.token.refresh_token}`
          }
        }).then((res) => {
          console.log(11, res);
          store.commit('setToken', {
            token: res.data.data.token,
            // 刷新的token还是使用原来的token
            refresh_token: token_storage.refresh_token
          });
          // return 把request的请求结果继续返回给发请求的具体位置
          return request(error.config);
        });
      } catch (err) {
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

// request.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default request;
