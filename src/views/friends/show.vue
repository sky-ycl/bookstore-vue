<template>
  <div class="post-article">
    <el-card class="post-card">
      <el-form ref="postForm" :model="post" label-width="100px" class="post-form">
        <el-form-item label="标题">
          <el-input v-model="post.title" placeholder="请输入标题" type="textarea" autosize class="custom-input"></el-input>
        </el-form-item>
        <el-form-item label="照片">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :file-list="post.images"
            :on-remove="handleRemove"
            class="post-upload"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url">
              <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPost">发表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        images: []
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    submitPost() {
      // 提交文章逻辑
      // 可以将文章数据发送到后端进行保存或处理
      console.log('提交文章:', this.post)
    },
    handleRemove(file, fileList) {
      const index = fileList.findIndex(item => item.uid === file.uid)
      if (index !== -1) {
        fileList.splice(index, 1)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.custom-input {
  width: 300px; /* 设置输入框的宽度 */
}

</style>
