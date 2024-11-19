<script setup>
import PostCard from "@/components/PostCard.vue";
import { readPostList, searchPost } from "@/services/postAPI.js";
import { ref, onMounted, watch } from "vue";
import { timeAgo } from "@/utils/timeCal/calculateTime";
import { useNavigation } from "@/utils/navigation/navigation.js";

const { goToPath } = useNavigation();

const props = defineProps({
  word: String | null,
  page: Number,
  size: Number,
});

const allPosts = ref([]); // 모든 데이터를 캐싱
const activeTab = ref("General");
const tabs = ["General", "QnA", "Jobs"];
const cards = ref(null);

async function fetchPosts() {

  const response = props.word  
  ? await searchPost(props.word, props.page, props.size) // 검색어가 있으면
  : await readPostList(props.page, props.size); // 검색어가 없으면

  if (response) {
    allPosts.value = response.content.map((item) => ({
      forumId: String(item.forumId),
      title: item.title,
      tag: item.forumHeader ? item.forumHeader.name : null,
      time: timeAgo(item.updateAt),
      nickName: item.nickName,
      content: item.content,
      likes: String(item.heartNum),
      headerColor: item.forumHeader ? item.forumHeader.color : null,
      forumCategory: item.forumCategory,
      viewCnt: item.viewCnt,
      isMine: item.isMine,
      commentNum: (item.commentList).length
    }));
    // 기본 탭("General")에 맞게 데이터 필터링
    filterPosts(activeTab.value);
  }
}
// 현재 활성 탭에 따라 데이터 필터링
function filterPosts(category) {
  cards.value = allPosts.value.filter(
    (item) => item.forumCategory === category
  );
}

// 초기 데이터 로드
onMounted(() => {
  fetchPosts();
});

// 탭 클릭 시 동작을 감지하여 fetchPosts 호출
watch(activeTab, (newTab) => {
  filterPosts(newTab);
});


function createPost() {
  goToPath(`/post/new`);
}
</script>
<template>
  <div class="container">
    <!-- Tabs -->
    <div class="tab-container">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="tab"
        :class="{ 'active-tab': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <div v-if="cards">
      <!-- Cards List -->
      <div class="cards-list">
        <PostCard
          v-for="card in cards"
          :forumId="card.forumId"
          :tag="card.tag"
          :time="card.time"
          :title="card.title"
          :nickName="card.nickName"
          :content="card.content"
          :likes="card.likes"
          :headerColor="card.headerColor"
          :forumCategory="card.forumCategory"
          :viewCnt="card.viewCnt"
          :isMine="card.isMine"
          :commentNum="card.commentNum"
        />
      </div>
    </div>
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
