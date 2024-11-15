<script setup>
import { ref } from 'vue';
const newReply = ref("")
defineProps({

  forumId: String
})

function addReply() {
}
</script>
<template>
  <div class="comment-container">
    <!-- Reply Input Section -->
    <div class="reply-input">
      <input type="text" v-model="newReply" placeholder="Type your reply..." />
      <button @click="addReply">➤</button>
    </div>
  </div>
</template>
<style scoped>
.comment-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
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
</style>
