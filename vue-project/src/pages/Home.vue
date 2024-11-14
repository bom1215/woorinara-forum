<script setup>
import PostCard from "@/components/PostCard.vue";
import { readPostList } from "@/services/postAPI.js";
import { ref, onMounted } from "vue";
const activeTab = ref("general");
// const cards = ref([
//   {
//     id: 1,
//     tag: "visa",
//     time: "7 hours ago",
//     title: "About D-2 visa",
//     author: "zypher",
//     content: "What kind of documents do I need to get D-2 visa",
//     likes: "1.4k",
//     headerColor: "BLUE"

//   },
//   {
//     id: 2,
//     tag: "visa",
//     time:  "7 hours ago",
//     title: "About D-2 visa",
//     author: "zypher",
//     content: "What kind of documents do I need to get D-2 visa",
//     likes: "1.4k",
//     headerColor: "GREEN"
//   },
// ])
const cards = ref(null);
onMounted(async () => {
  const response = await readPostList(0, 10);
  const result = response;
  cards.value = result.content.map((item) => ({
    id: item.forumId,
    tag: item.forumHeader,
    time: null,
    author: null,
    content: item.content,
    likes: item.heartNum,
    headerColor: item.forumHeader ? item.forumHeader.color : null, // forumHeader가 null일때는 null로 지정
  }));
});
</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="header-title">Community</h1>
      <div class="header-icons">
        <img alt="Search logo" src="../assets/serach.svg" />
        <img alt="bell logo" src="../assets/bell.svg" />
      </div>
    </div>

    <!-- Tabs -->
    <div class="tab-container">
      <button
        class="tab"
        :class="{ 'active-tab': activeTab === 'general' }"
        @click="activeTab = 'general'"
      >
        General
      </button>
      <button
        class="tab"
        :class="{ 'active-tab': activeTab === 'qna' }"
        @click="activeTab = 'qna'"
      >
        QnA
      </button>
      <button
        class="tab"
        :class="{ 'active-tab': activeTab === 'jobs' }"
        @click="activeTab = 'jobs'"
      >
        Jobs
      </button>
    </div>
    <div v-if="result">
      <!-- Cards List -->
      <div class="cards-list">
        <PostCard
          v-for="card in cards"
          :key="card.id"
          :tag="card.tag"
          :time="card.time"
          :title="card.title"
          :author="card.author"
          :content="card.content"
          :likes="card.likes"
          :header-color="card.headerColor"
        />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
/* General container styles */
.container {
  background-color: white;
  width: 100%;
  height: 100%;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eff0f2;
}

.header-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.header-icons {
  display: flex;
  gap: 1rem;
}

/* Tabs styles */
/* .tabs {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
} */
.tab-container {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding-bottom: 8px;
  color: #ffffff;
  border-bottom: 1px solid #eff0f2;
}

.tab {
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  color: #4a4a4a;
  background-color: #ffffff;
  border: none;
}

.active-tab {
  color: #3182ce; /* Blue color for active tab */
  border-bottom: 2px solid #3182ce;
}

/* Cards list styles */
.cards-list {
  display: flex;
  flex-direction: column; /* 카드들이 세로로 배치될 경우 */
  gap: 16px; /*카드 간의 간격을 16px로 설정 */
  padding-top: 2%;
}
</style>
