import request from '@/utils/request';

export const getSuggestion = (q) => {
  return request({
    // url地址空格 20%问题
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  });
};

// 获取搜索结果
export const searchResult = (params) => {
  return request({
    url: '/app/v1_0/search',
    type: 'GET',
    params
  });
};
