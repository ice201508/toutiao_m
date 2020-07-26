<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confim">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Number],
      required: true
    }
  },
  mounted() {
    const image = this.$refs.img;
    const cropper = new Cropper(image, {
      // aspectRatio: 16 / 9,
      // crop(event) {
      //   console.log(event);
      // }
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    });
  }
};
</script>

<style lang="less" scoped>
.update-photo {
  height: 100%;
  background-color: #000;
  img {
    width: 100%;
    display: block;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confim {
      width: 90px;
      height: 90px;
      font-size: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
