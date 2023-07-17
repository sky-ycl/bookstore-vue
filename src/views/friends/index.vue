<template>
  <div class="friend-circle">
    <el-card v-for="post in posts" :key="post.id" class="post-card">
      <div class="post-header">
        <el-avatar :src="post.avatar" size="medium"></el-avatar>
        <span class="post-username">{{ post.username }}</span>
      </div>
      <p></p>
      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>
      <div class="post-images">
        <el-image v-for="(image, index) in post.images" :key="index" :src="image" fit="cover" class="post-image"></el-image>
      </div>
      <div>
        <el-button
          type="text"
          class="post-like-btn"
          :class="{ 'highlight': post.isLiked }"
          @click="toggleLike(post)"
        >
          <i :class="post.isLiked ? 'my-like-icon-active' : 'my-like-icon'"></i>
          {{ post.likes }}
        </el-button>
        <el-button type="text" class="post-comment-btn" @click="showComments(post.id)">评论({{
            post.comments.length
          }})
        </el-button>
      </div>
      <div v-if="showCommentSection === post.id" class="comment-section">
        <el-divider></el-divider>
        <div v-for="comment in post.comments" :key="comment.id" class="comment">
          <span class="common-username">{{ comment.username }}:</span>
          <span class="comment-text">{{ comment.text }}</span>
        </div>
        <h3>评论</h3>
        <el-form ref="commentForm" :model="comment" label-width="0" class="comment-form">
          <el-form-item>
            <el-input v-model="comment.text" placeholder="请输入评论内容" class="short-input"></el-input>
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
import friendApi from '@/api/friends';

export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          username: '小鱼同学',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          images: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          ],
          content: '你真帅',
          likes: 10,
          isLike: false,
          comments: [
            {id: 1, username: 'Alice', text: 'Cool post!'},
            {id: 2, username: 'Bob', text: 'Nice picture!'}
          ]
        },
        {
          id: 2,
          username: 'John Doe',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          images: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          ],
          content: 'This is a post about something interesting.',
          likes: 10,
          comments: [
            {id: 1, username: 'Alice', text: 'Cool post!'},
            {id: 2, username: 'Bob', text: 'Nice picture!'}
          ]
        }
        // 添加更多动态数据...
      ],
      comment: {
        test: '',
      },
      showCommentSection: null
    }
  },
  methods: {
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
    }
  },
  mounted() {
    friendApi.getFriendList().then(response => {
      response.data
    })
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
</style>
