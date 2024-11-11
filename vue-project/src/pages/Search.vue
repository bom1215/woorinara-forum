<script setup>
import { ref, onMounted, nextTick } from 'vue';
const comment = ref("");
function clearComment() {
    comment.value = ""
};
// 페이지 로드 시 입력 필드에 포커스
const inputRef = ref("");
onMounted(async () => {
    await nextTick();
    if (inputRef.value) {
        inputRef.value.focus();
    }
});
</script>
<template>
  <div class="container">
    <h1>Search</h1>
    <div class="search-bar">
      <input
        ref = "inputref"
        type="text"
        v-model="comment"
        placeholder="Please enter a comment."
      />
      <button v-if="comment" class="clear-btn" @click="clearComment">✕</button>
    </div>
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
