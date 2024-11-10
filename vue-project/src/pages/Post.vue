<script setup>
import Comment from '@/components/Comment.vue';

</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button class="back-button">⬅️</button>
      <h2>QnA</h2>
    </div>

    <!-- Question Section -->
    <div class="question-section">
      <div class="tag">Visa</div>
      <h3 class="question-title">Questions About Required Documents</h3>
      <p class="author">Jack</p>
      <p class="time">7 hours ago</p>
      <p class="question-content">
        Lorem ipsum dolor sit amet consectetur. In diam adipiscing elit morbi.
        Malesuada feugiat non tellus sagittis commodo sit. Ultrices phasellus et
        est sagittis. Quis maecenas in laoreet fusce in gravida morbi. Sit id nunc
        id est.
      </p>
      <div class="like-section">
        <span class="like-icon">💙</span>
        <span class="like-count">1.4k</span>
      </div>
    </div>
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

.question-section {
  margin-top: 10px;
}

.tag {
  display: inline-block;
  background-color: #e0ffe5;
  color: #00c853;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}

.question-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}

.author, .time {
  color: #888;
  font-size: 14px;
}

.question-content {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.4;
}

.like-section {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.like-icon {
  font-size: 20px;
}

.like-count {
  margin-left: 5px;
  color: #888;
  font-size: 14px;
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
