import request from '@/utils/request'

export default {
  getFriendList() {
    return request({
      url: 'friends/list',
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
