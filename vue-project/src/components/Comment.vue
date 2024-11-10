<script setup>
import { ref } from 'vue';

const newReply = ref("")
const replies = ref([
  { author: "TTtttt", time: "7 hours", content: "Lorem ipsum dolor Lorem ipsum dolor" },
  { author: "Jack", time: "7 hours", content: "Lorem ipsum dolor Lorem ipsum dolor" },
])
function addReply() {
  if (newReply.value) {
    replies.value.push({
      author: "You",
      time: "Just now",
      content: newReply.value,
    });
    newReply.value = "";
  }
}
</script>
<template>
  <div class="comment-container">
    <!-- Reply Count -->
    <p class="reply-count">Reply {{ replies.length }}</p>

    <!-- Reply Input Section -->
    <div class="reply-input">
      <input type="text" v-model="newReply" placeholder="Type your reply..." />
      <button @click="addReply">➤</button>
    </div>

    <!-- Reply List Section -->
    <div class="reply-list">
      <div v-for="(reply, index) in replies" :key="index" class="reply-item">
        <p class="reply-author">{{ reply.author }}</p>
        <p class="reply-time">{{ reply.time }} ago</p>
        <p class="reply-content">{{ reply.content }}</p>
        <button class="reply-button">Reply</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.comment-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
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
