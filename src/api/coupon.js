import request from '@/utils/request'

export default {
  sendSign(searchModel) {
    return request({
      url: '/coupon/sendSign',
      method: 'get'
    })
  },
  SignCoupon: function(couponId) {
    return request({
      url: '/coupon/sign',
      method: 'put',
      params: {
        couponId: couponId
      }
    })
  },
  LimitCoupon() {
    return request({
      url: '/coupon/limit',
      method: 'get'
    })
  }
}
