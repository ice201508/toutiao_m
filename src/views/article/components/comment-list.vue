<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error="error"
      error-text="获取评论失败请重试"
    >
      <van-cell v-for="(item, index) in commentsList" :key="index">
        <CommentItem :comment="item" @REPLY_EVENT="$emit('REPLY_EVENT', $event)" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getCommentsAjax } from '@/api/comment';
import CommentItem from './comment-item';

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    commentsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // commentsList: [],
      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10
    };
  },
  created() {
    this.loading = true;
    this.onLoad();
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

        this.commentsList.push(...data.results);
        console.log(111, this.commentsList);
        this.$emit('COMMENT_TOTAL_EVENT', data.total_count);

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
        this.error = false;
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
