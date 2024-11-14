<script setup>
import "../assets/fonts/pretendard-jp.css";
import Headers from "./Headers.vue";

defineProps({
  tag: String,
  time: String,
  title: String,
  author: String,
  content: String,
  likes: String,
  headerColor: String
});
</script>
<template>
  <div class="post">
    <div class="header">
      <Headers 
    :text= tag
    :color=headerColor />
      <span class="time">{{ time }}</span>
    </div>
    <h2 class="title">{{ title }}</h2>
    <p class="author">{{ author }}</p>
    <p class="content">{{ content }}</p>
    <div class="footer">
      <span class="likes">
        <img alt="like logo" class="likes svg" src="../assets/like.svg" />
        {{ likes }}
      </span>
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
}

.author {
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
  align-items: center;
  justify-content: flex-end;
}

.likes {
  display: flex;
  align-items: center;
  color: #5c687a;
  font-size: 0.875rem;
}

.likes svg {
  margin-right: 4px;
}
</style>