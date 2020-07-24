<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in commentsList" :key="index" :title="item.content" />
    </van-list>
  </div>
</template>

<script>
import { getCommentsAjax } from '@/api/comment';

export default {
  name: 'CommentList',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      commentsList: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    };
  },
  methods: {
    async onLoad() {
      try {
        // 1. 发起请求
        const { data } = await getCommentsAjax({
          type: 'a',
          source: this.articleId,
          offset: this.offset,
          limit: this.limit
        });

        console.log(data);
        this.commentsList.push(...data.results);

        // 2. 页面数组的数据push  累加
        // 3. loading设置为false
        this.loading = false;
        // 4. 判断请求是否结束
        if (data.results.length) {
          this.offset = data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
