import request from '@/utils/request';

// 获取所有的频道列表
export const getAllChannels = (data) => {
  return request({
    url: '/app/v1_0/channels'
  });
};

// 批量修改用户频道列表（部分覆盖）
export const setUserChannels = (data) => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'patch',
    data
  });
};

// 删除指定用户频道
export const deleteUserChannel = (target) => {
  return request({
    url: `/app/v1_0/user/channels/${target}`,
    method: 'DELETE'
  });
};
