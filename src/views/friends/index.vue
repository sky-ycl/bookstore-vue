<template>
  <div class="douyin">
    <!-- 发表内容区域 -->
    <div class="publish-content">
      <el-input
        type="textarea"
        v-model="content"
        placeholder="发表内容"
        :autosize="{ minRows: 3, maxRows: 6 }"
      ></el-input>
      <el-button type="primary" @click="publish">发表</el-button>
    </div>

    <!-- 内容列表 -->
    <div class="content-list">
      <div v-for="(item, index) in contentList" :key="index" class="content-item">
        <div class="user-info">
          <!-- 用户头像、昵称等信息 -->
          <el-avatar :src="item.avatar" :size="40"></el-avatar>
          <span class="nickname">{{ item.nickname }}</span>
        </div>
        <div class="content-text">{{ item.content }}</div>
        <div class="actions">
          <!-- 评价 -->
          <el-button type="text" icon="el-icon-message" @click="comment(index)">
            {{ item.comments.length }}
          </el-button>
          <!-- 关注 -->
          <el-button
            type="text"
            :icon="item.isFollowed ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="toggleFollow(index)"
          ></el-button>
          <!-- 点赞 -->
          <el-button
            type="text"
            :icon="item.isLiked ? 'el-icon-thumb-up' : 'el-icon-thumb-down'"
            @click="toggleLike(index)"
          ></el-button>
        </div>
        <div class="comment-list">
          <!-- 评论列表 -->
          <div v-for="(comment, commentIndex) in item.comments" :key="commentIndex" class="comment-item">
            <span class="comment-user">{{ comment.user }}</span>
            <span class="comment-text">{{ comment.text }}</span>
          </div>
          <!-- 评论输入框 -->
          <el-input
            v-model="newComment[index]"
            placeholder="写评论..."
            size="small"
            @keyup.enter.native="addComment(index)"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "", // 发表的内容
      contentList: [], // 内容列表
      newComment: [], // 新增评论
    };
  },
  methods: {
    publish() {
      // 发表内容
      const newContent = {
        avatar: "用户头像",
        nickname: "用户昵称",
        content: this.content,
        comments: [],
        isFollowed: false,
        isLiked: false,
      };
      this.contentList.unshift(newContent);
      this.content = ' '
    },
    comment(index) {
      // 评价内容
      // ...
    },
    toggleFollow(index) {
      // 关注用户
      // ...
    },
    toggleLike(index) {
      // 点赞内容
      // ...
    },
    addComment(index) {
      // 添加评论
      const commentText = this.newComment[index];
      if (commentText) {
        this.contentList[index].comments.push({
          user: "当前用户",
          text: commentText,
        });
        this.newComment[index] = "";
      }
    },
  },
};
</script>

<style scoped>
.douyin {
  /* 样式设置 */
}
.publish-content {
  /* 发表内容区域样式设置 */
}
.content-list {
  /* 内容列表样式设置 */
}
.content-item {
  /* 单个内容项样式设置 */
}
.user-info {
  /* 用户信息样式设置 */
}
.nickname {
  /* 昵称样式设置 */
}
.content-text {
  /* 内容文本样式设置 */
}
.actions {
  /* 操作按钮样式设置 */
}
.comment-list {
  /* 评论列表样式设置 */
}
.comment-item {
  /* 单个评论项样式设置 */
}
.comment-user {
  /* 评论用户样式设置 */
}
.comment-text {
  /* 评论文本样式设置 */
}
</style>
