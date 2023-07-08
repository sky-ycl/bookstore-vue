export default {
  success(vueInstance, message) {
    vueInstance.$notify({
      title: '成功',
      message: message,
      type: 'success'
    })
  },
  fail(vueInstance, message) {
    vueInstance.$notify.error({
      title: '失败',
      message: message
    })
  }
}
