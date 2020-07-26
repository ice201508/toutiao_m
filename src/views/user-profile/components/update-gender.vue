<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @onCancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateProfile } from '@/api/user';

export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    };
  },
  methods: {
    onChange(picker, value, index) {
      this.localGender = index;
    },
    async onConfirm() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        });
        await updateProfile({
          gender: this.localGender
        });

        this.$emit('input', this.localGender);
        this.$emit('close');
        this.$toast.success('更新性别请求成功');
      } catch (err) {
        this.$toast.fail('更新性别请求失败');
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
