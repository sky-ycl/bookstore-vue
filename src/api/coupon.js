import request from '@/utils/request'

export default {
  sendSign(searchModel) {
    return request({
      url: '/coupon/sendSign',
      method: 'get'
    })
  },
  SignCoupon() {
    return request({
      url: '/coupon/sign',
      method: 'get'
    })
  },
  LimitCoupon() {
    return request({
      url: '/coupon/limit',
      method: 'get'
    })
  }
}
