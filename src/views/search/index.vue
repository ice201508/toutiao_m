<template>
  <div class="search-container">
    <!-- 搜索页面分为： 搜索框 + 搜索历史 + 搜索建议 + 搜索结果(回车键) 采用三个组件的方式开发 -->
    <form action="/" class="search-form">
      <van-search
        v-model="value"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
      />
    </form>

    <!-- 搜索历史 -->
    <SearchHistory v-if="showStatus === 'history'" />
    <!-- 搜索建议 -->
    <SearchSuggestion :search-text="value" v-if="showStatus === 'suggestion'" />
    <!-- 搜索结果 -->
    <SearchResult :search-text="value" v-if="showStatus === 'result'" />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue';
import SearchSuggestion from './components/search-suggestion.vue';
import SearchResult from './components/search-result.vue';

export default {
  name: 'SearchPage',
  data() {
    return {
      value: '',
      showStatus: 'history'
    };
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  created() {},
  methods: {
    onSearch() {
      this.showStatus = 'result';
    },
    onCancel() {
      // this.showStatus = 'history';
      this.$router.back();
    },
    onInput() {
      // 搜索建议，并不需要在input事件里面获取最新的value
      // 只需要将value值传递给suggestion组件即可，就可以实现同步变化
      if (this.value.trim()) {
        this.showStatus = 'suggestion';
      } else {
        this.showStatus = 'history';
      }
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 110px;
  /deep/ .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
