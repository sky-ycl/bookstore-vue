import request from '@/utils/request'

export default {
  getFriendList() {
    return request({
      url: '/friends/list',
      method: 'get'
    })
  },
  isLike(id) {
    return request({
      url: `/friends/like/${id}`,
      method: 'put'
    })
  },
  sendComment(comment) {
    return request({
      url: '/friend/comment',
      method: 'post',
      data: comment
    })
  }
}
