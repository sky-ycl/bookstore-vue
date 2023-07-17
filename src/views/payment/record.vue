<template>
  <div class="friend-circle">
    <el-card v-for="post in posts" :key="post.id" class="post-card">
      <div class="post-header">
        <el-avatar :src="post.avatar" size="medium"></el-avatar>
        <span class="post-username">{{ post.username }}</span>
      </div>
      <p></p>
      <el-image class="post-image" :src="post.image" fit="cover" style="width: 200px; height: 200px"></el-image>
      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>
      <el-button
        type="text"
        class="post-like-btn"
        :class="{ 'highlight': post.isLiked }"
        @click="toggleLike(post)"
      >
        <i :class="post.isLiked ? 'my-like-icon-active' : 'my-like-icon'"></i>
        {{ post.likes }}
      </el-button>
      <el-button type="text" class="post-comment-btn" @click="showComments(post.id)">评论({{ post.comments.length }})</el-button>
      <div v-if="showCommentSection === post.id" class="comment-section">
        <el-divider></el-divider>
        <h3>评论</h3>
        <div v-for="comment in post.comments" :key="comment.id" class="comment">
          <span class="common-username">{{ comment.username }}:</span>
          <span class="comment-text">{{ comment.text }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          username: '小鱼同学',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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
          image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          content: 'This is a post about something interesting.',
          likes: 10,
          comments: [
            {id: 1, username: 'Alice', text: 'Cool post!'},
            {id: 2, username: 'Bob', text: 'Nice picture!'}
          ]
        }
        // 添加更多动态数据...
      ],
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
    showComments(postId) {
      if (this.showCommentSection === postId) {
        this.showCommentSection = null
      } else {
        this.showCommentSection = postId
      }
    }
  }
}
</script>

<style scoped>
.common-username{
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

</style>
