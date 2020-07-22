import request from '@/utils/request.js';
import JSONBIG from 'json-bigint';

// 获取首页新闻列表
export const getArticle = (data) => {
  return request({
    // url里面空格  会变为 %20
    url: '/app/v1_1/articles',
    params: data
  });
};

// 获取文章详情
export const getArticleById = (id) => {
  console.log(111, id, JSONBIG.stringify(id));
  return request({
    url: '/app/v1_0/articles/' + id,
    methods: 'GET'
  });
};
