<template>
  <div class="coupon-container">
    <h3>签到领优惠券</h3>
    <el-card class="coupon-card">
      <div>
        <el-steps :active="active" finish-status="success">
          <el-step title="第一天"/>
          <el-step title="第二天"/>
          <el-step title="第三天"/>
          <el-step title="第四天"/>
          <el-step title="第五天"/>
          <el-step title="第六天"/>
          <el-step title="第七天"/>
        </el-steps>
        <el-button type="primary" style="margin-top: 12px;" :disabled="signDisabled" @click="next">
          {{ signDisabled ? '已签到' : '签到' }}
        </el-button>
      </div>
      <div class="coupon-info">
        <div class="coupon-title">满减优惠券</div>
        <div class="coupon-description">满100元减20元</div>
        <div class="coupon-action">
          <el-button type="primary" round :disabled="false" @click="receiveSignCoupon">立即领取</el-button>
        </div>
      </div>
    </el-card>
    <h3>限时优惠券</h3>
    <el-card v-for="coupon in couponInfo" :key="coupon.id" class="coupon-card">
      <div class="coupon-info" :coupon="coupon">
        <div class="coupon-title">限时优惠卷</div>
        <div class="coupon-description">满{{ coupon.minimumAmount }}元减{{ coupon.discountAmount }}</div>
        <div class="coupon-quantity">剩余可用数量：{{ coupon.quantity }}</div>
        <div class="coupon-time">
          <span class="time-label">活动时间:</span>
          <span class="time-range">{{ formatTimeRange }}</span>
        </div>
        <div class="coupon-action">
          <el-button type="primary" round :disabled="!isActive" @click="receiveLimitCoupon">立即领取</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import couponAPi from '@/api/coupon'
import notifyUtil from '@/utils/notifyUtil'
import {signCount, sign, isSign} from '@/api/user'
import timeUtil from '@/utils/timeUtil'

export default {
  data() {
    return {
      receiveDisabled: true,
      signDisabled: true,
      active: 0,
      couponInfo: [],
      LimitCoupon: {
        title: '限时优惠卷',
        discountAmount: 50,
        minimumAmount: 100,
        activityStartDate: '2023-07-09 00:00:00',
        activityEddDate: '2023-07-15 23:59:59',
        totalQuantity: 100, // 总数量
        claimedQuantity: 0 // 已领取数量
      },
      totalQuantity: 100, // 总数量
      claimedQuantity: 0 // 已领取数量
    }
  },
  computed: {
    isActive() {
      // 判断当前时间是否在活动时间范围内
      const now = new Date()
      const start = new Date(this.couponInfo[0].activityStartDate)
      const edd = new Date(this.couponInfo[0].activityEddDate)
      return now >= start && now <= edd
    },
    formatTimeRange() {
      const start = timeUtil.formatDate(new Date(this.couponInfo[0].activityStartDate))
      const end = timeUtil.formatDate(new Date(this.couponInfo[0].activityEddDate))
      return `${start} - ${end}` // 格式化活动时间范围
    }
  },
  mounted() {
    // 统计签到次数
    this.getSignCount()
    // 判断今天是否签到
    this.isSign()
    // 得到限时优惠卷的信息
    this.getLimitCouponInfo()
  },
  methods: {
    next() {
      if (this.active++ > 6) {
        this.active = 0
      }
      if (this.signDisabled) {
        // 如果已签到，则不执行签到操作
        return
      }
      // 执行签到操作
      // 调用后端接口，更新用户的签到状态
      sign().then(response => {
        if (response.message === 'success') {
          notifyUtil.success(this, '签到成功')
          this.signDisabled = true
          if (this.active > 6) {
            this.receiveDisabled = false
          } else {
            this.receiveDisabled = true
          }
        } else {
          notifyUtil.fail(this, '签到失败')
        }
        this.getSignCount()
      })
    },
    // 签到领取签到优惠卷
    receiveSignCoupon() {
      couponAPi.signCoupon(1).then(response => {
        if (response.message === 'success') {
          notifyUtil.success(this, '领取成功')
          this.receiveDisabled = false
        } else {
          notifyUtil.fail(this, response.message)
        }
      })
    },
    // 领取限时优惠卷
    receiveLimitCoupon() {
      if (this.isActive) {
        // 执行领取优惠券的操作
        couponAPi.limitCoupon(1).then(response => {
          const message = response.message
          if (message === 'success') {
            notifyUtil.success(this, '成功领取优惠券')
            // 更新界面
            this.getLimitCouponInfo()
          } else {
            notifyUtil.fail(this, response.message)
          }
        })
      } else {
        this.$notify.error('当前不在优惠券活动时间范围内')
      }
    },
    // 得到签到天数
    getSignCount() {
      // 获取签到次数
      signCount().then(response => {
        this.active = response.data
      })
    },
    // 查看今天是否签到
    isSign() {
      isSign().then(response => {
        if (response.data === true) {
          this.signDisabled = true
        } else {
          this.signDisabled = false
        }
      })
    },
    // 得到优惠卷信息
    getLimitCouponInfo() {
      couponAPi.limitCouponInfo().then(response => {
        this.couponInfo = response.data.couponInfo
        console.info(response.data.couponInfo)
        console.log(response.data.couponInfo[0].activityStartDate)
        console.log(new Date(response.data.couponInfo[0].activityStartDate))
        console.log(this.formatDate(new Date(response.data.couponInfo[0].activityStartDate)))
      })
    }
  }
}
</script>

<style>
.coupon-container {
  padding: 10px;
}

.coupon-card {
  width: 700px;
  margin-bottom: 10px;
}

.coupon-info {
  padding: 20px;
  text-align: center;
}

.coupon-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.coupon-description {
  margin-bottom: 10px;
}

.coupon-time {
  margin-bottom: 20px;
}

.time-label {
  font-weight: bold;
}

.coupon-action {
  margin-top: 20px;
}
</style>
