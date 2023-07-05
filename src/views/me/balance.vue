<template>
  <div class="balance-container">
    <h2 class="balance-title">我的余额</h2>
    <div class="balance-card">
      <div class="balance-wrapper">
        <span class="balance-label">当前余额:</span>
        <span class="balance-amount">{{ balance }}￥</span>
      </div>
      <el-button class="recharge-button" type="text"  @click="open">充值</el-button>
    </div>
  </div>
</template>
<script>
import balanceApi from '@/api/balance'
export default {
  data() {
    return {
      balance: 0
    }
  },
  methods: {
    open() {
      this.$prompt('请输入你的金额', '充值中心', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+(\.\d{1,2})?$/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({

          type: 'success',
          message: '充值成功,充值的金额:' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消充值'
        })
      })
    }
  },
  mounted() {
    balanceApi.getBalance().then(response => {
      console.log(response.data.balance)
      this.balance = response.data.balance
    })
  }
}
</script>
<style scoped>
.balance-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.balance-title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.balance-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.balance-wrapper {
  display: flex;
  align-items: center;
}

.balance-label {
  font-size: 18px;
  margin-right: 10px;
  color: #666;
}

.balance-amount {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.recharge-button {
  font-size: 18px;
  border-radius: 20px;
  padding: 10px 20px;
}
</style>
