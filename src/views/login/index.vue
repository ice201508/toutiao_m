<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        label="用户名"
        placeholder="用户名"
        clearable
        :rules="[
          {
            required: true,
            message: '请填写用户名'
          },
          {
            validator,
            message: '禁止非空字符串'
          },
          {
            pattern: /^1[3|5|6|7|8]\d{9}$/,
            message: '手机号码格式错误'
          }
        ]"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>

      <van-field
        v-model="code"
        type="text"
        class="code-input"
        name="code"
        label="验证码"
        clearable
        placeholder="请输入验证码"
        :rules="[
          {
            required: true,
            message: '请输入验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码必须是6位'
          }
        ]"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="60 * 1000"
            format="ss 秒"
            @finish="isCountDownShow = false"
          />
          <van-button v-else native-type="button" size="small" type="primary" @click="onSendSmsCode"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn" style="margin: 16px;">
        <van-button block :disabled="disabled" type="info" native-type="submit">
          提交
        </van-button>
      </div>
      <div>
        <van-button block type="primary" native-type="button" @click="test"
          >测试try..catch</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// import { Toast } from 'vant';
import { login, getSmsCode } from '../../api/user';

export default {
  name: 'Login',
  data() {
    return {
      mobile: '13911111111',
      code: '246810',
      disabled: true,
      isCountDownShow: false
    };
  },
  created() {},
  methods: {
    test() {
      let data = '111aa阿法士大夫';
      try {
        console.log(111, JSON.parse(data));
        return JSON.parse(data);
      } catch (err) {
        console.log(11, err);
        return data;
      }
    },
    // 加了这个函数验证， 表单使用 validate验证的时候，没有输出
    validator(val) {
      console.log('使用函数来验证', /\S/.test(val));
      return /\S/.test(val);
    },
    async onSendSmsCode() {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile');
      } catch {
        return this.$toast.fail('手机号格式错误');
      }

      // 2. 开启倒计时
      // this.isCountDownShow = true;

      try {
        await getSmsCode(this.mobile);
        this.$toast.success('发送成功');
      } catch (err) {
        // err.response 获取错误的返回对象
        console.log(err.response);
        if (err.response.status === 429) {
          this.$toast.fail('发送次数太频繁，请稍后再试');
        } else {
          this.$toast.fail('发送失败');
        }
      }
      // getSmsCode(this.mobile)
      //   .then((res) => {})
      //   .catch((err) => {});
    },
    onSubmit(values) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中...'
      });
      login({ mobile: this.mobile, code: this.code })
        .then((res) => {
          console.log('3登录成功：', res);
          this.$store.commit('setToken', res.data);
          this.$toast.success('登录成功');
        })
        .catch((err) => {
          this.$toast.fail('登录失败');
        });
    }
  },
  computed: {
    validatorObj() {
      const { mobile, code } = this;
      return { mobile, code };
    }
  },
  watch: {
    validatorObj: {
      handler(obj) {
        console.log(obj);
        if (obj.mobile.trim() && obj.code.trim()) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      deep: true, //深度监听
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.van-field__left-icon .iconfont {
  font-size: 32px;
}
.van-field__button .van-button--small {
  height: 46px;
  border-radius: 10px;
  border: 0;
  color: #bebebe;
  background-color: #ededed;
}
</style>
