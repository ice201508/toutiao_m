import request from '@/utils/request';

export const getAllChannels = (data) => {
  return request({
    url: '/app/v1_0/channels'
  });
};
