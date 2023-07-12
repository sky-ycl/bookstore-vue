import request from '@/utils/request'

export default {
  getOrderData(searchModel) {
    return request({
      url: '/order/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        orderId: searchModel.orderId
      }
    })
  },
  deleteOrder(orderId){
    return request({
      url: `/order/delete/${orderId}`,
      method: 'delete'
    })
  }
}
