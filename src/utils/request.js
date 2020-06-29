import axios from 'axios';
import Qs from 'qs';

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/',
  baseURL: 'https://api.leijiuling.com',
  timeout: 1000,
  transformRequest: [
    function(data, headers) {
      console.log('所有请求发出去之前：', data, headers);
      return data;
    }
  ],
  paramsSerializer: function(params) {
    console.log(123, params, Qs.stringify(params));
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
  transformResponse: [
    function(data) {
      console.log('所有请求返回到达then之前:', data);
      return data;
    }
  ]
});

// request.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default request;
