export default {
  formatDate(date) {
    // 自定义日期格式化函数
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Shanghai'
    }
    return date.toLocaleDateString('zh-CN', options)
  }
}
