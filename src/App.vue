<template>
  <div id="app">
    <h1>黑马头条</h1>
    <div>
      <i class="iconfont iconzuopin"></i>
      <i class="iconfont iconshouye"></i>
      <van-button type="default">默认按钮</van-button>
      <van-button @click="getAjax" type="primary">主要按钮</van-button>
      <van-button @click="postAjax" type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>

      <van-button plain hairline type="primary">细边框按钮</van-button>

      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
    </div>
    <div class="one"></div>
    <router-view />
  </div>
</template>

<script>
import { login, registry } from '@/api/user';
export default {
  name: 'App',
  methods: {
    getAjax() {
      login().then((res) => {
        console.log('请求成功：', res);
      });
    },
    postAjax() {
      registry({ addr: '北京', list: [1, 2, 3, { a: '测试' }] }).then((res) => {
        console.log('post请求：', res);
      });
    }
  }
};
</script>

<style scoped lang="less">
.one {
  width: 750px;
  height: 100px;
  background-color: #ccc;
}
</style>
