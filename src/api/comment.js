import request from '@/utils/request';
import JSONBIG from 'json-bigint';

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

// 对文章或评论点赞
export const addLikingsAjax = (target) => {
  console.log(333, target, JSONBIG.stringify(target));
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  });
};

// 取消对文章或评论点赞
export const deleteLikingsAjax = (target) => {
  return request({
    url: `/app/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  });
};
