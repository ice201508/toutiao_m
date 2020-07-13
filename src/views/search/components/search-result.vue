<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { searchResult } from '@/api/search';

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      page: 1,
      per_page: 10,
      loading: false,
      finished: false,
      list: []
    };
  },
  methods: {
    async onLoad() {
      const { data } = await searchResult({
        page: this.page,
        per_page: this.perpage,
        q: this.searchText
      });
      console.log('请求结束', data);
      // this.list = data.results;
      // 因为涉及到分页，每次请求结束都要把旧数据添加到list数组里面去，所以不能使用等号，应该使用push
      this.list.push(...data.results);
      // 每次一请求成功就 将loading设置为false，好让LIST组件根据数据的长短自动调用onLoad函数，发起请求. (因为只有一发起请求，就会自动将loading设置为true，我们需要根据情况手动设置为false)
      this.loading = false;

      if (data.results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
