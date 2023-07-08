<template>
  <el-card>
    <div class="coupon-container">
      <div class="coupon-header">
        <h2 class="coupon-title">优惠券标题</h2>
        <p class="coupon-description">优惠券描述信息</p>
      </div>
      <div class="coupon-content">
        <p class="coupon-discount">折扣金额：10元</p>
        <p class="coupon-validity">有效期：2023年12月31日</p>
      </div>
      <div class="coupon-actions">
        <el-button type="success" round>立即使用</el-button>
      </div>
    </div>
  </el-card>
</template>

<style>
.coupon-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.coupon-header {
  margin-bottom: 10px;
}

.coupon-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.coupon-description {
  font-size: 16px;
  color: #666;
}

.coupon-content {
  margin-bottom: 10px;
}

.coupon-discount {
  font-size: 20px;
  color: #ff0000;
}

.coupon-validity {
  font-size: 14px;
  color: #999;
}

.coupon-actions {
  text-align: center;
}
</style>
