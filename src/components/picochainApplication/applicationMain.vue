<template>
    <img :src="imgView">
</template>

<script>
export default {
  name: "applicationMain",
  data() {
    return {
      imgView: require('../../assets/许可公链应用主页.png'),
    }
  }
}
</script>

<style scoped>

</style>
