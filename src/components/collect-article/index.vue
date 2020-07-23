<template>
  <van-button
    class="collect-btn"
    :loading="loading"
    :icon="value ? 'star' : 'star-o'"
    :class="{ active: value }"
    @click="handlerCollect"
  />
</template>

<script>
import { addCollectionAjax, deleteCollectionAjax } from '@/api/article';

export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
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
      this.loading = true;
      try {
        if (this.value) {
          // 取消收藏
          await deleteCollectionAjax(this.userId);
        } else {
          await addCollectionAjax(this.userId);
        }
        this.$emit('input', !this.value);
        this.$toast.success(this.value ? '文章收藏成功' : '文章取消收藏成功');
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
  &.active {
    color: #ffa500;
  }
}
</style>
