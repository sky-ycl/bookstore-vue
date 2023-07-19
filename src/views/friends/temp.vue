<template>
  <el-upload
    class="avatar-uploader"
    action="/upload"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      return true
    },
    handleSuccess(response, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$message.success('上传成功')
    }
  }
}
</script>

<style scoped>
.video-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.video-content {
  margin-bottom: 20px;
}

.comment-section {
  border: 1px solid #ccc;
  padding: 20px;
}

.comment-section h3 {
  margin-top: 0;
}

.comment-list {
  margin-top: 20px;
}

.comment-item {
  margin-bottom: 10px;
}

.comment-actions {
  margin-top: 5px;
}
</style>
