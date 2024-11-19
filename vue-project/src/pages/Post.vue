<script setup>
import Comment from "@/components/Comment.vue";
import Article from "@/components/Article.vue";
import { ref, onMounted } from "vue";
import { readPostDetail } from "@/services/postAPI.js";
import { readCommentList } from "@/services/commentAPI.js";

import { timeAgo } from "@/utils/timeCal/calculateTime";
import { useRoute } from "vue-router";

import { useNavigation } from "@/utils/navigation/navigation.js";

const { goBack } = useNavigation();

const postContent = ref(null);
async function fetchPosts(forumId) {
  const response = await readPostDetail(forumId);
  if (response) {
    postContent.value = {
      forumId: response.forumId,
      title: response.title,
      content: response.content,
      forumCategory: response.forumCategory,
      forumHeader: response.forumHeader ? response.forumHeader.name : null,
      headerColor: response.forumHeader ? response.forumHeader.color : null,
      time: timeAgo(response.updateAt),
      nickName: response.nickName,
      likes: response.heartNum,
      commentList: response.commentList,
      viewCnt: response.viewCnt,
      isMine: response.isMine,
      commentNum: (response.commentList).length
    };
    console.log(postContent);
  }
}
const route = useRoute(); // 라우터 정보 가져오기

onMounted(() => {
  const id = route.params.forumId; // 라우터 파라미터에서 id 가져오기
  fetchPosts(id);
});

async function RenderCommentList(forumId) {
  const response = await readCommentList(forumId);
  if (response) {
    postContent.value.commentList = response;
  }
}
</script>
<template>
  <div class="container" v-if="postContent">
    <!-- Header -->
    <div class="header">
      <button @click="goBack()" class="back-button">
        <img alt="Back logo" src="../assets/back.svg" />
      </button>
      <h2>{{ postContent.forumCategory }}</h2>
    </div>
    <div>
      <!-- Article Section -->
      <Article
        :forumHeader="postContent.forumHeader"
        :time="postContent.time"
        :title="postContent.title"
        :nickName="postContent.nickName"
        :content="postContent.content"
        :likes="postContent.likes"
        :headerColor="postContent.headerColor"
        :forumCategory="postContent.forumCategory"
        :forumId="postContent.forumId"
        :viewCnt="postContent.viewCnt"
        :isMine="postContent.isMine"
        :commentNum="postContent.commentNum"
      />
      <!-- Comment Section -->
      <div>
        <Comment
          :replies="postContent.commentList"
          :forumId="postContent.forumId"
          @renderComments="RenderCommentList"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
}
.reply-count {
  margin-top: 20px;
  color: #888;
  font-size: 14px;
}

.reply-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.reply-input input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
}

.reply-input button {
  background: none;
  border: none;
  font-size: 18px;
}

.reply-list {
  margin-top: 20px;
}

.reply-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.reply-nickName,
.reply-time {
  color: #888;
  font-size: 14px;
}

.reply-content {
  margin-top: 5px;
  font-size: 16px;
}

.reply-button {
  background: none;
  color: #0066cc;
  border: none;
  font-size: 14px;
  margin-top: 5px;
  cursor: pointer;
}
</style>
