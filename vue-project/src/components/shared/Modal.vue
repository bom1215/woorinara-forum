<script setup>
import { ref, watch, onMounted } from 'vue';
const props = defineProps({
    type: String
})

const title = ref("")
const message = ref("")

if (props.type === "delete") {
    title.value = "Delete";
    message.value = "Are you sure you want to delete this post?";
}
// 부모로 이벤트 전달
defineEmits(["close","delete"]);

</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="icon">⚠️</div>
      <div class="title">{{ title }}</div>
      <div class="message">{{ message }}</div>
      <div class="buttons">
        <button class="button cancel" @click="$emit('close')">Cancel</button>
        <button class="button done" @click="$emit('delete')">Done</button>
      </div>
    </div>
  </div>
</template>

<style>
.body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은색 배경 */
  display: flex;
  justify-content: center; /* 가로 정렬 */
  align-items: center; /* 세로 정렬 */
  z-index: 1000; /* 모달이 다른 요소보다 위에 보이게 */
}

.modal {
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1001; /* 모달 컨텐츠는 오버레이 위에 */
}

.modal .icon {
  font-size: 24px;
  color: #FF5A5A;
  margin-bottom: 16px;
}

.modal .title {
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
}

.modal .message {
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
}

.modal .buttons {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.modal .button {
  width: 100px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.button.cancel {
  color: #007BFF;
  background-color: #ffffff;
  border: 2px solid #007BFF;
}

.button.done {
  color: #ffffff;
  background-color: #007BFF;
}
</style>
