<template>
  <div>
    123
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js';

export default {
  name: 'article-list',
  props: {
    channelid: Number
  },
  data() {
    return {
      page: 1,
      per_page: 10
    };
  },
  created() {
    console.log(11, this.channelid);
    this.getArticles();
  },
  methods: {
    async getArticles() {
      try {
        const { data } = await getArticle({
          channel_id: this.channelid,
          timestamp: +new Date(),
          with_top: 1
          // page: this.page,
          // per_page: this.per_page
        });
        console.log(11, data);
      } catch (err) {
        this.$toast.fail('请求失败', err.response.statusText);
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
