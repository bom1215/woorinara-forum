<script setup>
import { ref } from 'vue';
defineProps({
  tag: String,
  time: String,
  title: String,
  author: String,
  content: String,
  likes: String,
});
const showOptions = ref(false);
function toggleOptions() {
  showOptions.value = !showOptions.value;
}
</script>
<template>
  <!-- Question Section -->
  <div class="post">
    <div class="tag">{{ tag }}</div>
        <!-- Title Section with Options -->
        <div class="title-section">
      <h3 class="title">{{ title }}</h3>
      <span class="options-button" @click="toggleOptions">⋮</span>
      <div v-if="showOptions" class="options-menu">
        <button class="option-button">Edit</button>
        <button class="option-button">Delete</button>
      </div>
    </div>
    <p class="author">{{ author }}</p>
    <p class="time">{{ time }}</p>
    <p class="content">{{ content }}
    </p>
    <div class="like-section">
      <!-- <span class="like-icon">💙</span>
      <span class="like-count">{{ likes }}</span> -->
        <img alt="like-icon" class="likes svg" src="../assets/like.svg" />
        <span class="likes">
        {{ likes }}
      </span>
    </div>
  </div>
</template>
<style scoped>
.post {
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

.title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.options-button {
  font-size: 24px;
  cursor: pointer;
}

.options-menu {
  position: absolute;
  top: 25px; /* Adjusted to appear right below the options button */
  right: 0;
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

.author, .time {
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
