<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell center title="搜索历史">
        <van-icon name="delete" @click="deleteHistory" />
      </van-cell>
      <van-cell v-for="item in searchHistories" :key="item" :title="item">
        <div slot="right-icon">
          <van-icon name="close"></van-icon>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteHistory() {
      this.$dialog.confirm({
        message: '是否删除历史'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.search-history {
  margin: 15px 0;
}
</style>
