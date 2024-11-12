<script setup>
import { ref } from 'vue';

const selectBoard = ref("")
const header = ref("")
const title = ref("")
const postContent= ref("")
const header_option = ref(["visa","Banking and Finance","General Administrative", "ARC", "Phone","Housing and Living","School","Employment", "others"])
// async function complete(){
//   const url = "http://{{local}}/api/v1/forum/insert"
//   let response = await fetch(url,{
//     headers: {
//       'Content-Type': 'application/json',
//       'Authentication' : process.env.ACESSTOKEN
//     },
//     body: JSON.stringify()
//   })
// }

</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button class="back-button">
        <img alt="Cancel logo" src="../assets/cancel.svg" />
      </button>
      <h2>Writing</h2>
      <button class="completion-button" @click="complete">Completion</button>
    </div>

    <!-- Form Content -->
    <div class="form">
      <label class="label">Select a Board</label>
      <select class="select-board" v-model="selectBoard">
        <option>General</option>
        <option>QnA</option>
        <option>Jobs</option>
      </select>

      <select v-if="selectBoard=='QnA'" :class="{'header': selectBoard == 'QnA'}">
        <option v-for="option in header_option">{{ option }}</option>
      </select>

      <label class="label">Please enter the title.</label>
      <input v-model="title" class="title-input" placeholder="Enter title here" />

      <input
        type="text"
        class="postContent-input"
        placeholder="Ask any questions or stories you're curious about."
        v-model="postContent"
      />
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.back-button,
.completion-button {
  background: none;
  border: none;
  font-size: 16px;
}

.form {
  margin-top: 20px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.select-board,
.title-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
}

.postContent-input {
  color: #888;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box; /* 패딩과 테두리를 포함하여 부모 요소 너비를 넘지 않도록 설정 */
}
</style>
