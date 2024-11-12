<script setup>
import { ref } from 'vue';

const replies = ref([
  { author: "TTtttt", time: "7 hours", content: "Lorem ipsum dolor Lorem ipsum dolor" },
])
function deleteReply() {
  // 댓글 삭제 로직을 여기에 추가하세요.
  console.log("Reply deleted");
}
</script>
<template>
    <!-- Reply container Section -->
    <div v-for="(reply, index) in replies" :key="index" class="reply-container">
        <span class="reply-icon">↳</span>
        <span class="reply-author">{{ reply.author }}</span>
        <span class="reply-time">{{ reply.time }} ago</span>
        <button class="delete-button" @click="deleteReply">✕</button>
        <p class="reply-content">{{ reply.content }}</p>
    </div>
</template>
<style scoped>
.reply-container {
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
