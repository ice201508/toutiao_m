<template>
  <div class="update-photo">
    <img class="img" :src="img" />
  </div>
</template>

<script>
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Number],
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.update-photo {
  img {
    width: 100%;
  }
}
</style>
