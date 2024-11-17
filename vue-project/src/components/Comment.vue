<script setup>
import { ref } from 'vue';
import ParentReply from './ParentReply.vue'
import { createParentComment } from '@/services/commentAPI';
import { timeAgo } from "@/utils/timeCal/calculateTime";
import { useReplyStore } from "@/store/replyStore";
import { useNavigation } from "@/utils/navigation/navigation.js";

const { goToPath } = useNavigation();
const newReply = ref("")
const props = defineProps({
  replies: {
    type: Array,
    required: true,
  },
  forumId: String,
})
console.log(props.replies)
const emit = defineEmits(['renderComments'])

async function addReply(forumId) {
  // 댓글 내용이 비어있지 않은 경우만 처리
  if (newReply.value.trim() === "") {
    alert("Reply cannot be empty!");
    return;
  }
  // 새로운 댓글 추가 API 호출
  createParentComment(props.forumId, newReply.value)
    .then((result) => {
      if (result) {
        emit('renderComments', forumId)
        // 입력 필드 비우기
        newReply.value = "";
      }
    })
    .catch((error) => {
      console.error("Error adding reply:", error);
    });
}


const replyStore = useReplyStore();

function navigateToCommentDetail(time, nickName, content, childList, forumId, parentCommentId, practice) {
  console.log("여길봐", time, nickName, content, childList, forumId, parentCommentId, practice)
  replyStore.time = time;
  replyStore.nickName = nickName;
  replyStore.content = content;
  replyStore.childList = childList;
  replyStore.forumId = forumId;
  replyStore.parentCommentId = parentCommentId;
  replyStore.practice = practice

  console.log("여길봐2",replyStore.parentCommentId,replyStore.practice)
  goToPath("/commentDetail");
}
</script>
<template>
  <div v-if="replies" class="comment-container" >
    <!-- Reply Count -->
    <p v-if="replies.length >0" class="reply-count">Reply {{ replies.length }}</p>

    <!-- Reply Input Section -->
    <div class="reply-input">
      <input type="text" v-model="newReply" placeholder="Type your reply..." maxlength="500"/>
      <button @click="addReply(forumId)">➤</button>
    </div>

    <!-- Reply List Section -->
    <div v-if="replies.length >0" class="reply-list">
        <ParentReply
        v-for="reply in replies"
        :time = "timeAgo(reply.updatedAt)"
        :nickName = "reply.nickName"
        :content = "reply.content"
        :childList = "reply.childList"
        :replyFunction="() => navigateToCommentDetail(timeAgo(reply.updatedAt), reply.nickName, reply.content, reply.childList, forumId, reply.commentId, '1')"
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
