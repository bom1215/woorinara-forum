<script setup>
import { ref } from 'vue';
import ParentReply from './ParentReply.vue'

const newReply = ref("")
const replies = ref([
  { author: "TTtttt", time: "7 hours", content: "Lorem ipsum dolor Lorem ipsum dolor" },
  { author: "Jack", time: "7 hours", content: "Lorem ipsum dolor Lorem ipsum dolor" },
])
function addReply() {
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
        <ParentReply
        v-for="reply in replies"
        :time = reply.time
        :author = reply.author
        :content = reply.content
        />
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
</style>
