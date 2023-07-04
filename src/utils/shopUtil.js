export default {
  success(shopInstance, message) {
    shopInstance.$notify({
      title: '成功',
      message: message,
      type: 'success'
    })
  },
  fail(shopInstance, message) {
    shopInstance.$notify.error({
      title: '失败',
      message: message
    })
  }
}
