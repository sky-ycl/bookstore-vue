import request from '@/utils/request'

export default {
  getBalance() {
    return request({
      url: 'me/balance',
      method: 'get'
    })
  },
  recharge() {
    return request({
      url: 'me/recharge',
      method: 'put'
    })
  }
}
