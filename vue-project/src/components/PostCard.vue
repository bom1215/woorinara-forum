<script setup>
import "../assets/fonts/pretendard-jp.css";
import Headers from "./Headers.vue";
import { useNavigation } from "@/utils/navigation/navigation.js";
import postFooter from "./postFooter.vue";
const { goToPath } = useNavigation();

const props = defineProps({
  forumId: String,
  tag: String,
  time: String,
  title: String,
  nickName: String,
  content: String,
  likes: Number,
  headerColor: String,
  forumCategory: String,
  viewCnt: Number,
  isMine: Boolean,
  commentNum: Number,
});

function navigateToPost() {
  goToPath(`/post/${props.forumId}`);
}
</script>
<template>
  <div class="post" @click="navigateToPost">
    <div v-if="forumCategory === 'QnA'" class="header">
      <Headers :text="tag" :color="headerColor" />
      <span class="time">{{ time }}</span>
    </div>
    <h2 class="title">
      {{ title }}
      <span v-if="forumCategory !== 'QnA'" class="time">{{ time }}</span>
    </h2>

    <p class="nickName">{{ nickName }}</p>
    <p class="content">{{ content }}</p>
  </div>
  <postFooter
    :forumId="forumId"
    :likes="likes"
    :viewCnt="viewCnt"
    :commentNum="commentNum"
  />
</template>
<style scoped>
.post {
  /* width : fit-content; */
  background-color: #ffffff;
  padding-top: 20px;
  padding-right: 24px;
  padding-bottom: 12px;
  padding-left: 24px;
  border-bottom: 4px;
  gap: 12px;
  font-family: "Pretendard JP";
}

.header {
  display: flex;
  justify-content: space-between;
}

.time {
  color: #929aa6;
  font-size: 12px;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #12161d;
  margin: 8px 0;
  justify-content: space-between;
  display: flex;
}

.nickName {
  color: #929aa6;
  font-size: 0.875rem;
  margin-bottom: 8px;
}

.content {
  color: #272c33;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 16px;
}
</style>
