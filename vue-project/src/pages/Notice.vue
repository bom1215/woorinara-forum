<script setup>
import { ref, onMounted } from "vue";
import { readNoticeList } from "../services/noticeAPI.js";
import { formatDate } from "@/utils/timeCal/formatTime";
import { useNavigation } from "@/utils/navigation/navigation.js";

const { goBack, goToPath } = useNavigation();

const notifications = ref(null);

async function fetchNotices() {
  const response = await readNoticeList();

  if (response) {
    notifications.value = response.map((item) => ({
      alarmId: item.id,
      memberId: item.memberId,
      nickName: item.memberName,
      content: item.content,
      forumId: item.refId,
      isRead: item.isRead,
      time: formatDate(item.updatedAt),
    }));
  }
}
function navigateToPost(forumId, alarmId) {
  goToPath(`/post/${forumId}/alarmId/${alarmId}`);
}

// 초기 데이터 로드
onMounted(() => {
  fetchNotices();
});
</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button @click="goBack()" class="back-button">
        <img alt="Back logo" src="../assets/back.svg" />
      </button>
      <h1>Notice</h1>
    </div>

    <!-- Notification List -->
    <div v-if="notifications" class="notification-list">
      <div
        @click="navigateToPost(notification.forumId, notification.alarmId)"
        v-for="notification in notifications"
        class="notification-item"
      >
        <p
          class="message"
          :class="{ read: notification.isRead, unread: !notification.isRead }"
        >
          {{ notification.content }}
        </p>
        <p class="date">{{ notification.time }}</p>
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
  margin: 0;
}
.read{
color: #ddd;
}
.unread{
  color: #333;
}

.date {
  font-size: 14px;
  color: #aaa;
  margin: 0;
}
</style>
