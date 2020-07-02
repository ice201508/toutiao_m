<template>
  <div>
    <!-- 找list列表组件 https://youzan.github.io/vant/#/zh-CN/list#xia-la-shua-xin -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.art_id"
          :title="item.title"
          style="display: block"
        >
          <div>
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}评论</span>
            <span>{{ item.pubdate }}</span>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js';

export default {
  name: 'articlelist',
  props: {
    channelid: Number
  },
  data() {
    return {
      // page: 1,
      // per_page: 10
      error: false,
      refreshing: false,
      loading: false,
      finished: false,
      timestamp: null, // 请求下一页数据的时间戳
      refreshSuccessText: '刷新成功',
      list: []
    };
  },
  created() {
    console.log('组件接收父组件传递进来的值：', this.channelid);
  },
  methods: {
    // load事件   滚动条与底部距离小于 offset 时触发
    async onLoad() {
      try {
        // 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成
        // 1. 发请求获取数据
        const { data } = await getArticle({
          channel_id: this.channelid,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
          // page: this.page,
          // per_page: this.per_page
        });

        // 2. 将获取的数据添加到本地数组里面
        // 因为会在触底的时候不断的触发load事件，进而执行这个函数；所以list数组不能直接赋值，应该是每次都push进去旧数组里面
        // this.list = data.results;
        this.list.push(...data.results);

        // 3. 执行一遍请求，就讲loading状态 设置为false
        this.loading = false;

        // 4. 判断请求数据是否结束
        if (data.results.length) {
          this.timestamp = data.results.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
        // this.$toast.fail('请求失败', err.response);
      }
    },
    async onRefresh() {
      const { data } = await getArticle({
        channel_id: this.channelid,
        timestamp: Date.now(),
        with_top: 1
      });

      this.list.unshift(...data.results);

      this.refreshing = false;
      this.refreshSuccessText = `刷新成功了，更新了${data.results.length}条数据`;
    }
  }
};
</script>

<style lang="less" scoped>
.article-list1 {
  position: fixed;
  top: 180px;
  bottom: 100px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
/deep/ .van-cell__value {
  text-align: left;
  span {
    margin-right: 20px;
  }
}
</style>
