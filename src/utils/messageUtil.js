export default {
  success(vueInstance, message) {
    vueInstance.message({
      message: message,
      type: 'success'
    })
  },
  fail(vueInstance, message) {
    vueInstance.message({
      message: message,
      type: 'fail'
    })
  }
}
