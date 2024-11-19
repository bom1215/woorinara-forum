<script setup>
import PostList from "@/components/PostList.vue";
import { useNavigation } from "@/utils/navigation/navigation.js";

const { goToPath } = useNavigation();

const currentPage = 0; // 현재 페이지
const pageSize = 10; // 페이지 크기

</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="header-title">Community</h1>
      <div class="header-icons">
        <img
          @click="goToPath('/search')"
          alt="Search logo"
          src="../assets/serach.svg"
        />
        <img
          @click="goToPath('/notice')"
          alt="bell logo"
          src="../assets/bell.svg"
        />
      </div>
    </div>
    <!-- Content -->
    <PostList :page="currentPage" :size="pageSize" />
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
</style>
