<script setup>
import PostCard from "@/components/PostCard.vue";
import { readPostList } from "@/services/postAPI.js";
import { ref, onMounted, watch } from "vue";
import { timeAgo } from "@/utils/timeCal/calculateTime";
import { useRouter } from "vue-router";
const activeTab = ref("General");
const cards = ref(null);

async function fetchPosts(category) {
  const response = await readPostList(0, 10);
  if (response) {
    const result = response.content;
    cards.value = result
      .filter(item => item.forumCategory === category)
      .map(item => ({
        id: item.forumId,
        title : item.title,
        tag: item.forumHeader ? item.forumHeader.name : null,
        time: timeAgo(item.updateAt),
        author: item.nickName,
        content: item.content,
        likes: String(item.heartNum),
        headerColor: item.forumHeader ? item.forumHeader.color : null
      }));
  }
}

// 초기 데이터 로드
onMounted(() => {
  fetchPosts("General");
});

// 탭 클릭 시 동작을 감지하여 fetchPosts 호출
watch(activeTab, (newTab) => {
  fetchPosts(newTab);
});

const router = useRouter(); 

function createPost() {
  router.push('/post/new');
}
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
        :class="{ 'active-tab': activeTab === 'General' }"
        @click="activeTab = 'General'"
      >
        General
      </button>
      <button
        class="tab"
        :class="{ 'active-tab': activeTab === 'QnA' }"
        @click="activeTab = 'QnA'"
      >
        QnA
      </button>
      <button
        class="tab"
        :class="{ 'active-tab': activeTab === 'Jobs' }"
        @click="activeTab = 'Jobs'"
      >
        Jobs
      </button>
    </div>
    <div v-if="cards">
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
  <img
      alt="add-icon"
      class="add-icon"
      src="../assets/createPost.svg"
      @click="createPost"
    />
  
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
.add-icon {
  position: fixed; /* 화면의 고정된 위치에 배치 */
  bottom: 16px; /* 아래로부터 16px */
  right: 16px; /* 오른쪽으로부터 16px */
  width: 50px; /* 아이콘 크기 */
  height: 50px;
  cursor: pointer; /* 클릭 가능 */
  z-index: 1000; /* 다른 요소 위에 배치 */
}
</style>
