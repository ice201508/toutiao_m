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

export const getUserProfile = () => {
  return request({
    url: '/app/v1_0/user'
  });
};

// 获取用户的频道接口
export const getUserChannels = () => {
  return request({
    url: '/app/v1_0/user/channels'
  });
};
