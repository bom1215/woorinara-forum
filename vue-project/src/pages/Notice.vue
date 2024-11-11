<script>
import { ref } from 'vue';

export default {
  setup() {
    const notifications = ref([
      { message: "Someone replied to your post.", date: "2024.11.12 12:46:13" },
      { message: "Someone replied to your comment.", date: "2024.11.11 16:43:11" },
      { message: "Someone replied to your post.", date: "2024.11.10 09:43:13" },
    ]);

    return { notifications };
  },
};
</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button class="back-button">⬅️</button>
      <h1>Notice</h1>
    </div>

    <!-- Notification List -->
    <div class="notification-list">
      <div v-for="(notification, index) in notifications" :key="index" class="notification-item">
        <p class="message">{{ notification.message }}</p>
        <p class="date">{{ notification.date }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.back-button {
  font-size: 18px;
  margin-right: 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.notification-list {
  margin-bottom: 60px;
}

.notification-item {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.message {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.date {
  font-size: 14px;
  color: #aaa;
  margin: 0;
}
</style>
