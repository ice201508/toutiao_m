import request from '@/utils/request.js';

export const login = (data) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  });
};

export const getSmsCode = (data) => {
  return request({
    url: `/app/v1_0/sms/codes/${data}`,
    method: 'get'
  });
};
