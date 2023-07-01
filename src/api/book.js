import request from '@/utils/request'

export default {
  getListByPage(searchModel){
    return request({
      url: '/book/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize
      }
    })
  }
}
