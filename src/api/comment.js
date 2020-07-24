import request from '@/utils/request';

/**
 * 获取评论或者回复
 */

export const getCommentsAjax = (params) => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  });
};
