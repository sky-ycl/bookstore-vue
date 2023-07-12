<template>
  <div class="purchase-container">
    <h2>购买商品</h2>

    <div class="product-info">
      <p>商品名称: {{ product.name }}</p>
      <p>商品价格: {{ product.price }}</p>
    </div>

    <div class="coupon-container">
      <h3>优惠券</h3>
      <el-select v-model="selectedCoupon" placeholder="请选择优惠券">
        <el-option v-for="coupon in coupons" :key="coupon.id" :label="coupon.name" :value="coupon.id"></el-option>
      </el-select>
    </div>

    <div class="purchase-button">
      <el-button type="primary" @click="purchase">购买</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: "商品A",
        price: 100,
      },
      coupons: [
        { id: 1, name: "优惠券1", amount: 10 },
        { id: 2, name: "优惠券2", amount: 20 },
        { id: 3, name: "优惠券3", amount: 30 },
      ],
      selectedCoupon: null,
    };
  },
  methods: {
    purchase() {
      // 处理购买逻辑
      console.log("商品名称:", this.product.name);
      console.log("商品价格:", this.product.price);
      console.log("选择的优惠券:", this.selectedCoupon);
      // 可以根据需要进行进一步的处理，例如提交购买订单给后端进行处理等
    },
  },
};
</script>

<style scoped>
.purchase-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.product-info {
  margin-bottom: 20px;
}

.coupon-container {
  margin-bottom: 20px;
}

.purchase-button {
  text-align: center;
}
</style>
