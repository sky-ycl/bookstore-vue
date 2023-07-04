<template>
  <el-input-number v-model="num" @change="handleChange(num)" :min="1"  ></el-input-number>
</template>

<script>
export default {
  data() {
    return {
      num: 1
    }
  },
  methods: {
    handleChange(num) {
      console.log(num)
    }
  }
}
</script>

<style>

</style>
