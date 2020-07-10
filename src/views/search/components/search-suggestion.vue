<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell v-for="(item, index) in suggestionList" :key="index" icon="search">
        <div slot="title" v-html="highLight(item, searchText)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search';
import { debounce } from 'lodash';

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestionList: []
    };
  },
  methods: {
    async getSuggestion(q) {
      try {
        const res = await getSuggestion(q);
        this.suggestionList = res.data.options;
        console.log(this.suggestionList);
      } catch (err) {
        this.$toast.fail('获取建议数据失败，请重试！');
      }
    },
    // 将我们的关键词在搜索结果的每一行字中高亮显示
    // source就是当前搜索的结果哪一行， keyword就是我们输入的关键词
    highLight(source, keyword) {
      let pattern = new RegExp(keyword, 'gi');
      // 字符串的replace方法 会返回一个被替换过后的字符串
      return source.replace(pattern, `<span style="color:#3296fa">${keyword}</span>`);
    }
  },
  watch: {
    // https://cn.vuejs.org/v2/api/#vm-watch
    // searchText: function(val, oldVal) {
    //   console.log('new: %s, old: %s', val, oldVal);
    // }
    searchText: {
      // handler 这个函数的名称是固定的
      handler: debounce(function(q) {
        this.getSuggestion(q);
      }, 200),
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.search-suggestion {
  margin: 15px 0;
}
</style>
