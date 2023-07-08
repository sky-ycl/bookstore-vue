import request from '@/utils/request'

export default {
  getBalance() {
    return request({
      url: 'me/balance',
      method: 'get'
    })
  },
  recharge(money) {
    return request({
      url: 'me/recharge',
      method: 'post',
      params: {
        money: money
      }
    })
  }
}
