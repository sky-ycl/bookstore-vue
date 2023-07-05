import request from '@/utils/request'

export default {
  getRecordList(searchModel) {
    return request({
      url: '/record/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        recordId: searchModel.recordId
      }
    })
  }
}
