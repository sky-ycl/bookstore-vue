<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ nickName }} </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  nickName: 'Dashboard',
  computed: {
    ...mapGetters([
      'nickName'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
