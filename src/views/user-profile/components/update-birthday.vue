<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateProfile } from '@/api/user';
import dayjs from 'dayjs';

export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 11, 31),
      currentDate: new Date(this.value)
    };
  },
  methods: {
    async onConfirm() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        });
        const localBirthday = dayjs(this.currentDate).format('YYYY-MM-DD');
        await updateProfile({
          birthday: localBirthday
        });

        this.$emit('input', localBirthday);
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
