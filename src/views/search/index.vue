<template>
  <div class="search-container">
    <!-- 搜索页面分为： 搜索框 + 搜索历史 + 搜索建议 + 搜索结果(回车键) 采用三个组件的方式开发 -->
    <form action="/">
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
    <SearchHistory />
    <!-- 搜索建议 -->
    <SearchSuggestion />
    <!-- 搜索结果 -->
    <SearchResult />
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
      value: ''
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
      console.log(11);
    },
    onCancel() {
      console.log(222);
    },
    onInput() {
      console.log('输入框内容发生变化');
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.search-container {
  /deep/ .van-search__action {
    color: #fff;
  }
}
</style>
