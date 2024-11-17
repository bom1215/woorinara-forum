<script setup>
import { ref } from "vue";
import { useNavigation } from "@/utils/navigation/navigation.js";
import ParentReply from "../components/ParentReply.vue";
import { useReplyStore } from "@/store/replyStore";
import { storeToRefs } from "pinia";
import { createChildComment } from "@/services/commentAPI";

const { goBack } = useNavigation();
const newReply = ref(""); // 검색 입력값

const replyStore = useReplyStore();
const { time, nickName, content, childList, forumId, parentCommentId, practice } =
  storeToRefs(replyStore);
    // 상태를 출력

function addChildReply() {
  // 댓글 내용이 비어있지 않은 경우만 처리
  if (newReply.value.trim() === "") {
    alert("Reply cannot be empty!");
    return;
    }
  console.log(time, nickName, content, childList, forumId, parentCommentId, practice)
  console.log(forumId, parentCommentId, newReply, practice)
  // 새로운 댓글 추가 API 호출
  createChildComment(forumId, parentCommentId, newReply)
    .then((result) => {
      if (result) {
        // 입력 필드 비우기
        newReply.value = "";
        // 로컬 캐싱 데이터 업데이트
        const newComment = {
          updatedAt: new Date().toISOString(),
          nickName: nickName.value,
          content: newReply.value.trim(),
          childList: [], // 대댓글은 기본적으로 비어 있음
        };
        childList.value.push(newComment); // 로컬 데이터에 즉시 추가
      }
    })
    .catch((error) => {
      console.error("Error adding reply:", error);
    });
}

function openKeybaord() {
  
}
</script>

<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button @click="goBack()" class="back-button">
        <img alt="Back logo" src="../assets/back.svg" />
      </button>
    </div>
    <!-- Parent Reply Component -->
    <ParentReply
      :time="time"
      :nickName="nickName"
      :content="content"
      :childList="childList"
      :replyFunction="()=>openKeybaord"
    />
    <!-- Reply to Text -->
    <h2 class="reply-to">Reply to {{ nickName }}</h2>
    <!-- Reply Bar -->
    <div class="reply-input">
      <input
        type="text"
        v-model="newReply"
        placeholder="Type your reply..."
        maxlength="500"
      />
      <button @click="addChildReply()">➤</button>
    </div>
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

.send-button {
  background-color: #3b8aff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
}

.send-button:hover {
  background-color: #357ae8;
}
</style>
