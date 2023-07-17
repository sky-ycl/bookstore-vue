<template>
  <div class="video-container">
    <!-- 视频内容 -->
    <div class="video-content">
      <p>视频内容</p>
      <el-button type="primary" @click="likeVideo">点赞</el-button>
    </div>

    <!-- 评论区 -->
    <div class="comment-section">
      <h3>评论区</h3>

      <!-- 发表评论 -->
      <el-form ref="commentForm" :model="newComment" label-width="0">
        <el-form-item>
          <el-input v-model="newComment.content" placeholder="发表评论"></el-input>
          <el-button type="primary" @click="postComment">发送</el-button>
        </el-form-item>
      </el-form>

      <!-- 评论列表 -->
      <div class="comment-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <p>{{ comment.content }}</p>
          <div class="comment-actions">
            <el-button type="text" @click="likeComment(comment.id)">点赞</el-button>
            <el-button type="text" @click="followUser(comment.userId)">关注</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newComment: {
        content: '',
      },
      comments: [
        { id: 1, content: '评论1', userId: 1 },
        { id: 2, content: '评论2', userId: 2 },
        { id: 3, content: '评论3', userId: 3 },
      ],
    };
  },
  methods: {
    postComment() {
      // 发表评论逻辑
      const newCommentId = this.comments.length + 1;
      const newComment = {
        id: newCommentId,
        content: this.newComment.content,
        userId: 0, // 设置当前用户的ID
      };
      this.comments.push(newComment);

      // 清空评论输入框
      this.newComment.content = '';
    },
    likeComment(commentId) {
      // 点赞评论逻辑
      // 在这里处理点赞评论的操作
      console.log('点赞评论：', commentId);
    },
    followUser(userId) {
      // 关注用户逻辑
      // 在这里处理关注用户的操作
      console.log('关注用户：', userId)
    },
    likeVideo() {
      // 点赞视频逻辑
      // 在这里处理点赞视频的操作
      console.log('点赞视频');
    },
  },
};
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
