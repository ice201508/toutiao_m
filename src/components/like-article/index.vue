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
    async handlerCollect() {
      // this.loading = true;
      // try {
      //   if (this.value) {
      //     // 取消收藏
      //     await deleteCollectionAjax(this.articleId);
      //   } else {
      //     await addCollectionAjax(this.articleId);
      //   }
      //   this.$emit('input', !this.value);
      //   this.$toast.success(this.value ? '文章收藏成功' : '文章取消收藏成功');
      // } catch (err) {
      //   this.$toast('文章收藏请求失败');
      // }
      // this.loading = false;
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
