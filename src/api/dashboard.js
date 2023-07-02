import request from '@/utils/request'

export default {
  getUsername() {
    return request({
      url: '/user/name',
      method: 'get'
    })
  }
}
