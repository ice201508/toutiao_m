<template>
  <div class="search-history">
    <van-cell-group>
      <van-cell>
        <div v-if="searchHistories.length === 0">
          <span slot="title">暂无搜索历史</span>
        </div>
        <div v-else class="sh-wrap clearfix">
          <div slot="title" class="sh-1">
            搜索历史
          </div>
          <div slot="default" class="sh-2">
            <div v-if="isDelelteShow">
              <span @click="deleteAll">全部删除</span>&emsp;&emsp;
              <span @click="isDelelteShow = false">完成</span>
            </div>
            <div v-else>
              <van-icon name="delete" @click="isDelelteShow = true" />
            </div>
          </div>
        </div>
      </van-cell>
      <van-cell
        v-for="item in searchHistories"
        :key="item"
        :title="item"
        @click="onSearchItemClick(item)"
      >
        <div slot="right-icon" v-if="isDelelteShow">
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
  data() {
    return {
      isDelelteShow: false
    };
  },
  methods: {
    deleteAll() {
      this.$emit('clear-search-histories');
      this.isDelelteShow = false;
    },
    onSearchItemClick(item) {
      // 搜索历史记录的点击，如果不是删除状态，那么就跳转到搜索结果页面；如果是删除状态就删除搜索历史
      if (this.isDelelteShow) {
        let curr_index = this.searchHistories.indexOf(item);
        this.searchHistories.splice(curr_index, 1);
      } else {
        this.$emit('onSearch', item);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search-history {
  margin: 15px 0;
  .sh-wrap {
    .sh-1 {
      float: left;
    }
    .sh-2 {
      float: right;
    }
  }
}
</style>
