<template>
  <div class="coupon-container">
    <h2 class="title">我的优惠券</h2>
    <el-row gutter="20">
      <el-col :span="8" v-for="(coupon, index) in couponList" :key="index">
        <el-card :body-style="{ padding: '20px' }" class="coupon-card">
          <div class="coupon-header">
            <div class="coupon-header-left">
              <h3 class="coupon-title">满{{ coupon.minimumAmount }}减{{ coupon.discountAmount}}元</h3>
              <p class="coupon-description">{{ coupon.describe }}</p>
            </div>
            <div class="coupon-header-right">
              <p class="coupon-amount">{{ coupon.discountAmount}}￥</p>
              <p class="coupon-type">{{ coupon.type===0 ? '满减优惠': '限时优惠卷' }}</p>
            </div>
          </div>
          <div class="coupon-footer">
            <p class="coupon-validity">
              <strong>有效期:{{ timeUtil.formatDate(new Date()) }} - {{timeUtil.formatDate(new Date())}}</strong>
            </p>
            <el-button type="primary" class="coupon-button" @click="goToShop">立即使用</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import couponApi from '@/api/coupon'
import timeUtil from '@/utils/timeUtil'
export default {
  computed: {
    timeUtil() {
      return timeUtil
    }
  },
  data() {
    return {
      couponList: []
    }
  },
  methods: {
    goToShop() {
      this.$router.push('/books/list')
    }
  },
  mounted() {
    couponApi.myCouponInfo().then(response => {
      console.log(response.data)
      this.couponList = response.data
      console.log(this.couponList)
    })
  }
}
</script>

<style scoped>
.coupon-container {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.coupon-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.coupon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.coupon-title {
  font-size: 16px;
  font-weight: bold;
}

.coupon-description {
  font-size: 14px;
  color: #999;
  margin-top: 6px;
}

.coupon-header-right {
  text-align: right;
}

.coupon-amount {
  font-size: 18px;
  font-weight: bold;
}

.coupon-type {
  font-size: 14px;
  color: #999;
  margin-top: 6px;
}

.coupon-validity {
  font-size: 14px;
  color: #999;
}

.coupon-button {
  margin-top: 10px;
}
</style>
