<template>
  <div class="friend-circle">
    <el-card v-for="post in posts" :key="post.id" class="post-card">
      <div class="post-header">
        <el-avatar :src="post.icon" size="medium"></el-avatar>
        <span class="post-username">{{ post.nickName }}</span>
      </div>
      <p></p>
      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>
      <div class="post-images">
        <el-image v-for="(image, index) in post.image" :key="index" :src="image" fit="cover" class="post-image"></el-image>
      </div>
      <div>
        <el-button
          type="text"
          class="post-like-btn"
          :class="{ 'highlight': post.isLiked }"
          @click="toggleLike(post)"
        >
          <i :class="post.isLiked ? 'my-like-icon-active' : 'my-like-icon'" @click="isLike(post.id)">{{
              post.likes
            }}</i>
        </el-button>
        <el-button type="text" class="post-comment-btn" @click="showComments(post.id)">
          评论({{ post.friendComments.length}})
        </el-button>
      </div>
      <div v-if="showCommentSection === post.id" class="comment-section">
        <el-divider></el-divider>
        <div v-for="(comment,index) in post.friendComments" :key="index" class="comment">
          <el-avatar :src="post.icon" size="small"></el-avatar>
          <span class="common-username">{{ comment.nickName }}:</span>
          <span class="comment-text">{{ comment.text }}</span>
        </div>
        <h3>评论</h3>
        <el-form ref="commentForm" :model="comment" label-width="0" class="comment-form">
          <el-form-item>
            <el-input v-model="comment.text" placeholder="请输入标题" type="textarea" autosize
                      class="custom-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitComment">发表评论</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import friendApi from '@/api/friends'
import messageUtil from '@/utils/messageUtil'

export default {
  data() {
    return {
      posts: [],
      comment: {
        text: ''
      },
      showCommentSection: null
    }
  },
  methods: {
    isLike(id) {
      console.log(id)
      friendApi.isLike(id).then(response => {
        const res = response.data
        if (res) {
          messageUtil.warn(this, '取消点赞')
          this.posts.isLike = false
        } else {
          messageUtil.success(this, '点赞成功')
          this.posts.isLike = true
        }
      })
    },
    toggleLike(post) {
      post.isLiked = !post.isLiked
      if (post.isLiked) {
        post.likes++
      } else {
        post.likes--
      }
    },
    submitComment() {
      // 发表评论逻辑
      // 可以将评论数据发送到后端进行保存或处理
      const newComment = {
        id: '', // 生成唯一的评论ID
        username: 'Alice', // 当前用户的用户名
        text: this.comment.text
      }
      this.post.comments.push(newComment);
      this.comment.text = '' // 清空评论内容
    },
    showComments(postId) {
      if (this.showCommentSection === postId) {
        this.showCommentSection = null
      } else {
        this.showCommentSection = postId
      }
    },
    // 得到朋友圈列表
    getFriendList() {
      friendApi.getFriendList().then(response => {
        console.log(response.data)
        this.posts = response.data
      })
    }
  },
  mounted() {
    this.getFriendList()
  }
}
</script>

<style scoped>
.common-username {
  color: #337ab7
}

.comment-text {
  margin-left: 15px; /* 设置评论内容与用户名的间距 */
}

.post-like-btn,
.post-comment-btn {
  margin-right: 10px;
}

.highlight {
  color: red;
}

.my-like-icon,
.my-like-icon-active {
  font-size: 18px;
}

.my-like-icon:before {
  content: "\2661"; /* 自定义的点赞图标，可以替换为其他 Unicode 编码或自定义字体图标类名 */
}

.my-like-icon-active:before {
  content: "\2665"; /* 自定义的点赞图标（高亮），可以替换为其他 Unicode 编码或自定义字体图标类名 */
}

.post-images {
  display: flex;
  flex-wrap: wrap;
}

.post-image {
  width: 200px;
  height: 200px;
  margin-right: 10px; /* 添加照片之间的间隔 */
  margin-bottom: 10px; /* 添加照片与下方内容的间隔 */
}

.comment-input .el-input.short-input {
  width: 200px;
  margin-right: 10px;
}

.custom-input {
  width: 300px; /* 设置输入框的宽度 */
}
</style>
