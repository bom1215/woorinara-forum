<script setup>
import Comment from '@/components/Comment.vue';
import Article from '@/components/Article.vue';
import { ref } from 'vue';
const article = ref({
  tag: "Visa",
  time: "7시간 전",
  title: "Questions About Required Documents",
  author: "zypher",
  content: "Lorem ipsum dolor sit amet consectetur. In diam adipiscing elit morbi. Malesuada feugiat non tellus sagittis commodo sit. Ultrices phasellus etest sagittis. Quis maecenas in laoreet fusce in gravida morbi. Sit id nuncid est.",
  likes: "1.4k",
  headerColor: "blue"
})
</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button class="back-button">⬅️</button>
      <h2>QnA</h2>
    </div>

    <!-- Article Section -->
     <Article :tag="article.tag" 
     :time="article.time" 
     :title="article.title" 
     :author="article.author"
     :content="article.content"
     :likes="article.likes"
     :headerColor="article.headerColor"
     />
    <!-- Comment Section -->
    <Comment />

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

.reply-author, .reply-time {
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
