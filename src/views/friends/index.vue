<template>
  <el-col :span="8">
    <el-button class="sms-code-btn" type="primary" :disabled="countdownTime > 0" @click="startCountdown">
      {{ countdownTime > 0 ? countdownTime + 's 后重新获取' : '获取验证码' }}
    </el-button>
  </el-col>

</template>

<script>
export default {
  data() {
    return {
      countdownTime: 0
    }
  },
  methods: {
    startCountdown() {
      this.countdownTime = 60 // 重置倒计时时间为 60 秒
      const timer = setInterval(() => {
        this.countdownTime--
        if (this.countdownTime === 0) {
          clearInterval(timer) // 清除定时器
        }
      }, 1000)
    }
  }
}
</script>
