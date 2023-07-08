<template>
  <div class="coupon-container">
    <h3>签到领优惠券</h3>
    <el-card class="coupon-card">
      <div>
        <el-steps :active="active" finish-status="success">
          <el-step title="第一天"></el-step>
          <el-step title="第二天"></el-step>
          <el-step title="第三天"></el-step>
          <el-step title="第四天"></el-step>
          <el-step title="第五天"></el-step>
          <el-step title="第六天"></el-step>
          <el-step title="第七天"></el-step>
        </el-steps>
        <el-button type="primary" style="margin-top: 12px;" @click="next" :disabled="signDisabled">
          {{ signDisabled ? '已签到' : '签到' }}
        </el-button>
      </div>
      <div class="coupon-info">
        <div class="coupon-title">满减优惠券</div>
        <div class="coupon-description">满100元减20元</div>
        <div class="coupon-action">
          <el-button type="primary" round :disabled="receiveDisabled" @click="SignCoupon">立即领取</el-button>
        </div>
      </div>
    </el-card>
    <h3>限时优惠券</h3>
    <el-card class="coupon-card">
      <div class="coupon-info">
        <div class="coupon-title">限时优惠券</div>
        <div class="coupon-description">满100元减50</div>
        <div class="coupon-quantity">剩余可用数量：{{ remainingQuantity }}</div>
        <div class="coupon-time">
          <span class="time-label">活动时间：</span>
          <span class="time-range">{{ formatTimeRange }}</span>
        </div>
        <div class="coupon-action">
          <el-button type="primary" round :disabled="!isActive" @click="claimCoupon">立即领取</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import couponAPi from '@/api/coupon'
import notifyUtil from '@/utils/notifyUtil'
import {signCount, sign, isSign} from '@/api/user'

export default {
  data() {
    return {
      lastSignDate: null, // 上一次签到的日期
      receiveDisabled: true,
      signDisabled: true,
      active: 0,
      totalQuantity: 100, // 总数量
      claimedQuantity: 0, // 已领取数量
      startTime: new Date('2023-07-01 00:00:00'), // 优惠券活动开始时间
      endTime: new Date('2023-07-15 23:59:59') // 优惠券活动结束时间
    }
  },
  methods: {
    next() {
      if (this.active++ > 6) {
        this.active = 0
      }
      if (this.signDisabled) {
        // 如果已签到，则不执行签到操作
        // return
      }
      // 执行签到操作
      // 调用后端接口，更新用户的签到状态
      sign().then(response => {
        if (response.message === 'success') {
          notifyUtil.success(this, '签到成功')
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
    // 签到领取优惠卷
    SignCoupon() {
      couponAPi.SignCoupon(1).then(response => {
        if (response.message === 'success') {
          notifyUtil.success(this, '领取成功')
          this.receiveDisabled = false
        } else {
          notifyUtil.fail(this, response.message)
        }
      })
    },
    // 查询今天是否签到
    formatDate(date) {
      // 自定义日期格式化函数
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Asia/Shanghai'
      }
      return date.toLocaleDateString('zh-CN', options)
    },
    claimCoupon() {
      if (this.isActive) {
        // 执行领取优惠券的操作
        this.$notify({
          title: '成功',
          message: '成功领取优惠券',
          type: 'success'
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
    isSign: function() {
      isSign().then(response => {
        if (response.data === true) {
          this.signDisabled = true
        } else {
          this.signDisabled = false
        }
      })
    }

  },
  computed: {
    remainingQuantity() {
      return this.totalQuantity - this.claimedQuantity
    },
    isActive() {
      // 判断当前时间是否在活动时间范围内
      const now = new Date()
      return now >= this.startTime && now <= this.endTime
    },
    formatTimeRange() {
      const start = this.formatDate(this.startTime)
      const end = this.formatDate(this.endTime)
      return `${start} - ${end}` // 格式化活动时间范围
    }
  },
  mounted() {
    // 统计签到次数
    this.getSignCount()

    // 判断今天是否签到
    this.isSign()
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
