import request from '@/utils/request.js';

export const login = () => {
  return request({
    url: '/get',
    params: {
      ttt: 'zs',
      yyy: '123456'
    }
  });
};

export const registry = (data) => {
  return request({
    url: '/post',
    method: 'post',
    data
  });
};
