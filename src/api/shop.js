import request from '@/utils/request'

export default {
  getShopList(searchModel) {
    return request({
      url: '/shop/shopCart',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        title: searchModel.title
      }
    })
  },
  addShopCart(id) {
    return request({
      url: `/shop/add/${id}`,
      method: 'post'
    })
  },
  cancelShopCart(id) {
    return request({
      url: `/shop/cancel/${id}`,
      method: 'put'
    })
  },
  clearShopCart() {
    return request({
      url: '/shop/clear',
      method: 'delete'
    })
  }
}
