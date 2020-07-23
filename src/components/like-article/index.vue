<template>
  <van-button
    class="collect-btn"
    :loading="loading"
    :icon="value == 1 ? 'good-job' : 'good-job-o'"
    :class="{ active: value == 1 }"
    @click="handlerLike"
  />
</template>

<script>
import { addLikingsAjax, deleteLikingsAjax } from '@/api/article';
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async handlerLike() {
      this.loading = true;
      try {
        let status = -1;
        if (this.value == 1) {
          // 取消喜欢
          await deleteLikingsAjax(this.articleId);
        } else {
          await addLikingsAjax(this.articleId);
          status = 1;
        }
        this.$emit('input', status);
        this.$toast.success(status == 1 ? '点赞成功' : '取消点赞');
      } catch (err) {
        this.$toast('文章收藏请求失败');
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.collect-btn {
  &.van-button--default {
    border: 0;
  }
  color: #777;
  &.active {
    color: #e5645f;
  }
}
</style>
