import request from '@/utils/request'

export default {
  getListByPage(searchModel) {
    return request({
      url: '/books/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        title: searchModel.title,
        author: searchModel.author
      }
    })
  },
  getBookById(id) {
    return request({
      url: `/books/${id}`,
      method: 'get'
    })
  }
}
