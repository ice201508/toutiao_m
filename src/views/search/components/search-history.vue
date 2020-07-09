<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell center title="搜索历史">
        <van-icon name="delete" @click="deleteHistory" />
      </van-cell>
      <van-cell title="单元格" />
      <van-cell title="单元格" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
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
