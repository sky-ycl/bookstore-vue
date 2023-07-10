export default {
  success(vueInstance, message) {
    vueInstance.$message({
      message: message,
      type: 'success'
    })
  },
  warn(vueInstance, message) {
    vueInstance.$message({
      message: message,
      type: 'warning'
    })
  },
  fail(vueInstance, message) {
    vueInstance.$message({
      message: message,
      type: 'error'
    })
  }
}
