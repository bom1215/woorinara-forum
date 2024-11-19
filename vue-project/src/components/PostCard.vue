<script setup>
import "../assets/fonts/pretendard-jp.css";
import Headers from "./Headers.vue";
import { useNavigation } from "@/utils/navigation/navigation.js";

const { goToPath } = useNavigation();

const props = defineProps({
  forumId: String,
  tag: String,
  time: String,
  title: String,
  nickName: String,
  content: String,
  likes: String,
  headerColor: String,
  forumCategory: String,
  viewCnt: String,
  isMine: String,
  commentNum: String
});

function navigateToPost(){
  goToPath(`/post/${props.forumId}`);
}
</script>
<template>
  <div class="post" @click="navigateToPost">
    <div v-if="forumCategory === 'QnA'" class="header">
      <Headers 
    :text= tag
    :color=headerColor />
      <span class="time">{{ time }}</span>
    </div>
    <h2 class="title">{{ title }}
      <span v-if="forumCategory !== 'QnA'" class="time">{{ time }}</span>
    </h2>
    
    <p class="nickName">{{ nickName }}</p>
    <p class="content">{{ content }}</p>
    <div class="footer">
    <span class="views">
      <img alt="view logo" class="views svg" src="../assets/view.svg" />
      {{ viewCnt }}
    </span>
    <div class="right">
      <span class="likes">
        <img alt="like logo" class="likes svg" src="../assets/like.svg" />
        {{ likes }}
      </span>
      <span class="comments">
        <img alt="comment logo" class="comments svg" src="../assets/comment.svg" />
        {{ commentNum }}
      </span>
    </div>
  </div>
  </div>
</template>
<style scoped>
.post {
  /* width : fit-content; */
  background-color: #FFFFFF;
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
  color: #929AA6;
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

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
}

.views {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.right {
  display: flex;
  align-items: center;
  gap: 20px; /* 아이콘 간 간격 */
}

.footer img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>


/* like/shre */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 12px;

width: 342px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
