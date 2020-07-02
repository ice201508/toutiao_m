import request from '@/utils/request.js';

export const getArticle = (data) => {
  return request({
    // url里面空格  会变为 %20
    url: '/app/v1_1/articles',
    params: data
  });
};
