<script setup>
import { ref } from 'vue';
import ParentReply from './ParentReply.vue'
import { createParentComment } from '@/services/commentAPI';

const newReply = ref("")
const props = defineProps({
  replies: {
    type: Array,
    required: true
  },
  forumId: String,
})

async function addReply() {
  // 댓글 내용이 비어있지 않은 경우만 처리
  if (newReply.value.trim() === "") {
    alert("Reply cannot be empty!");
    return;
  }
  
  // 새로운 댓글 추가 API 호출
  createParentComment(props.forumId, newReply.value)
    .then((result) => {
      if (result) {
        // 입력 필드 비우기
        newReply.value = "";
      }
    })
    .catch((error) => {
      console.error("Error adding reply:", error);
    });
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
        :time = "reply.updatedAt"
        :author = "reply.memberName"
        :content = "reply.content"
        :childList = "reply.childList"
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
