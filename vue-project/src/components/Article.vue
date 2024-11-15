<script setup>
import { ref } from "vue";
import Headers from "./Headers.vue";

defineProps({
  tag: String,
  time: String,
  title: String,
  author: String,
  content: String,
  likes: String,
  headerColor: String,
  forumCategory: String
});
const showOptions = ref(false);
function toggleOptions() {
  showOptions.value = !showOptions.value;
}
</script>

<template>
  <!-- Question Section -->
  <div class="post">
    <div class="header">
      <Headers v-if="forumCategory === 'QnA'" :text="tag" :color="headerColor" />
      <span class="time">{{ time }}</span>
    </div>
    <!-- Title Section with Options -->
    <div class="title">
      <h3>{{ title }}</h3>
      <div class="options-container">
        <span class="options-button" @click="toggleOptions">⋮</span>
        <div v-if="showOptions" class="options-menu">
          <button class="option-button">Edit</button>
          <button class="option-button">Delete</button>
        </div>
      </div>
    </div>
    <p class="author">{{ author }}</p>
    <p class="content">{{ content }}</p>
    <div class="like-section">
      <img alt="like-icon" class="likes svg" src="../assets/like.svg" />
      <span class="likes">{{ likes }}</span>
    </div>
  </div>
</template>

<style scoped>
.post {
  position: relative;
}
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 20px;
  font-weight: bold;
  position: relative;
  display: flex;
  align-items: center;
}
.options-container {
  position: relative; /* 메뉴 위치를 옵션 버튼 아래로 설정 */
  display: inline-block;
}
.options-button {
  font-size: 24px;
  cursor: pointer;
}
.options-menu {
  position: absolute;
  top: 100%; /* 버튼 바로 아래에 위치 */
  left: 0;
  margin-top: 4px; /* 버튼과 메뉴 사이에 약간의 간격 */
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
}
.option-button {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
}
.option-button:hover {
  background-color: #f0f0f0;
}
.author,
.time {
  color: #888;
  font-size: 14px;
}
.content {
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
.likes {
  margin-left: 5px;
  color: #888;
  font-size: 14px;
}
</style>
