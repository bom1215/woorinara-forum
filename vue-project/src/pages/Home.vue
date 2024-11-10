<script setup>
import PostCard from "@/components/PostCard.vue";
import { ref } from "vue";
const activeTab = ref('general');
const cards = ref([
  {
    id: 1,
    tag: "visa",
    time: "7시간 전",
    title: "About D-2 visa",
    author: "zypher",
    content: "What kind of documents do I need to get D-2 visa",
    likes: "1.4k",
  },
  {
    id: 2,
    tag: "visa",
    time: "7시간 전",
    title: "About D-2 visa",
    author: "zypher",
    content: "What kind of documents do I need to get D-2 visa",
    likes: "1.4k",
  },
])
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
    <div class="tabs">
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

    <!-- Cards List -->
    <div class="cards-list">
      <PostCard
        v-for="card in cards" :key="card.id" :tag="card.tag" :time="card.time"
        :title="card.title" :author="card.author" :content="card.content"
        :likes="card.likes"
      />
    </div>
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
  border-bottom: 1px solid #e0e0e0;
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
.tabs {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
}

.tab {
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  color: #4a4a4a;
}

.active-tab {
  color: #3182ce; /* Blue color for active tab */
  border-bottom: 2px solid #3182ce;
}

/* Cards list styles */
.cards-list {
  padding: 1rem;
}
</style>
