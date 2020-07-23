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

// 文章收藏
export const addCollectionAjax = (target) => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  });
};

// 文章取消收藏
export const deleteCollectionAjax = (target) => {
  return request({
    url: '/app/v1_0/article/collections/' + target,
    method: 'DELETE'
  });
};

// 文章点赞
export const addLikingsAjax = (target) => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  });
};

// 文章点赞
export const deleteLikingsAjax = (target) => {
  return request({
    url: '/app/v1_0/article/likings/' + target,
    method: 'DELETE'
  });
};
