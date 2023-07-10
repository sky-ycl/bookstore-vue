import request from '@/utils/request'

export default {
  signCoupon: function(couponId) {
    return request({
      url: '/coupon/sign',
      method: 'put',
      params: {
        couponId: couponId
      }
    })
  },
  limitCouponInfo() {
    return request({
      url: '/coupon/info',
      method: 'get'
    })
  },
  limitCoupon: function(couponId) {
    return request({
      url: '/coupon/limit',
      method: 'put',
      params: {
        couponId: couponId
      }
    })
  },
  myCouponInfo() {
    return request({
      url: '/coupon/me',
      method: 'get'
    })
  }
}
