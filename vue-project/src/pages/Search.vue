<script setup>
import { ref, onMounted } from 'vue';
import PostList from "@/components/PostList.vue";


function clearinput() {
    input.value = ""
};

const input = ref(""); // 검색 입력값
const searchWord =ref(null) // 실제 검색된 값
const currentPage = ref(0); // 현재 페이지
const pageSize = ref(20); // 페이지 크기

async function fetchSearchPosts() {
  // 입력값 앞뒤 공백 제거
  if (input.value.trim()) {
    console.log("Searching for:", input.value.trim());
    searchWord.value = input.value
  } else {
    console.warn("Search input is empty.");
  }
}

</script>
<template>
  <div class="container">
    <h1>Search</h1>
    <div class="search-bar">
      <input
        ref = "inputref"
        type="text"
        v-model="input"
        placeholder="Please enter a input."
        @keyup.enter="fetchSearchPosts"
      />
      <button v-if="input" class="clear-btn" @click="clearinput">✕</button>
    </div>
    <PostList
    v-if="searchWord"
    :word="searchWord"
    :page="currentPage"
    :size="pageSize"/>
  </div>
</template>
<style scoped>
.container {
  padding: 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #d1d1d1;
  border-radius: 20px;
  padding: 10px 15px;
  width: 100%;
  max-width: 400px;
}

input[type="text"] {
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  color: #333;
}

input[type="text"]::placeholder {
  color: #ccc;
}

.clear-btn {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
}

.clear-btn:hover {
  color: #999;
}
</style>
