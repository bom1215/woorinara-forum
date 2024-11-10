<script setup>
defineProps({
  tag: String,
  time: String,
  title: String,
  author: String,
  content: String,
  likes: String,
});
</script>
<template>
  <!-- Question Section -->
  <div class="post">
    <div class="tag">{{ tag }}</div>
    <h3 class="title">{{ title }}</h3>
    <p class="author">{{ author }}</p>
    <p class="time">{{ author }}</p>
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
