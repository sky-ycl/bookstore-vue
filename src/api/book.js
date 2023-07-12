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
  },
  buyBook(data) {
    return request({
      url: '/books/buy',
      method: 'put',
      data
    })
  },
  getUserBookList(searchModel) {
    return request({
      url: '/books/me',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        title: searchModel.title
      }
    })
  },
  createUserBook(id, num) {
    return request({
      url: '/books/myBook',
      method: 'put',
      params: {
        // id为书籍id  num为书籍数量
        id: id,
        num: num
      }
    })
  }
}
