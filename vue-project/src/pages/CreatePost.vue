<script setup>
import { ref } from "vue";
import { createPost } from "@/services/postAPI.js";
import { useRouter } from "vue-router";

const forumCategory = ref("");
const header = ref("");
const title = ref("");
const postContent = ref("");
const header_option = ref([
  "visa",
  "Banking and Finance",
  "General Administrative",
  "ARC",
  "Phone",
  "Housing and Living",
  "School",
  "Employment",
  "others",
]);

function resize(event) {
  const element = event.target;
  element.style.height = "18px"; // 초기 높이 설정
  element.style.height = `${element.scrollHeight}px`; // 내용에 맞게 높이 설정
}
const router = useRouter(); 

function navigateToPost(forumId){
  router.push(`/post/${forumCategory}/${forumId}`);
}

async function complete() {
  // 필수 입력값 확인
  if (!title.value || !postContent.value || !forumCategory.value) {
    console.error("All fields are required.");
    return;
  }

  // 게시글 생성 함수 호출
  try {
    const response = await createPost(
      title.value,
      postContent.value,
      forumCategory.value,
      forumCategory.value === "QnA" ? header.value : null // QnA가 아니면 header를 null로 설정
    );
    console.log("Post created successfully");

    if (response) {
      // navigateToPost(response.forumId)
      navigateToPost(32)
    }
    
  } catch (error) {
    console.error("Error occurred while creating the post:", error);
  }
}
</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="postHeader">
      <button class="back-button">
        <img alt="Cancel logo" src="../assets/cancel.svg" />
      </button>
      <h2>Writing</h2>
      <button class="completion-button" @click="complete">Completion</button>
    </div>

    <!-- Form Content -->
    <div class="form">
      <select class="select-board" v-model="forumCategory">
        <option value="" disabled selected>Select a Board</option>
        <option>General</option>
        <option>QnA</option>
        <option>Jobs</option>
      </select>

      <select
        v-if="forumCategory == 'QnA'"
        :class="{ header: forumCategory == 'QnA' }"
        v-model="header" 
      >
        <option v-for="option in header_option">{{ option }}</option>
      </select>

      <textarea
        v-model="title"
        @input="resize"
        class="title-input"
        placeholder="Please enter the title."
        maxlength="300"
      />
      <textarea
        v-model="postContent"
        @input="resize"
        class="postContent-input"
        placeholder="Ask any questions or stories you're curious about."
        maxlength="2000"
      />
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.postHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.back-button,
.completion-button {
  background: none;
  border: none;
  font-size: 16px;
}

.form {
  margin-top: 20px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.select-board,
.title-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: none;
}

.postContent-input {
  color: #090909;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box; /* 패딩과 테두리를 포함하여 부모 요소 너비를 넘지 않도록 설정 */
  border: none;
}
.header {
  border: none;
}
</style>
