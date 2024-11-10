<script setup>
import "../assets/fonts/pretendard-jp.css";
defineProps({
  tag: String,
  time: String,
  title: String,
  author: String,
  content: String,
  likes: String,
});
</script>
<template>
  <div class="post">
    <div class="header">
      <span class="tag">{{ tag }}</span>
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
  background-color: #eff0f2;
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
  align-items: center;
  margin-bottom: 8px;
}

.tag {
  background-color: #e6f4ea;
  color: #34c759;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.time {
  color: #a0a0a0;
  font-size: 0.75rem;
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
