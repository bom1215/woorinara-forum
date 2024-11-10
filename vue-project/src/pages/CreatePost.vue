<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button class="back-button">
        <img alt="Cancel logo" src="../assets/cancel.svg"/>
      </button>
      <h2>Writing</h2>
      <button class="completion-button">Completion</button>
    </div>

    <!-- Form Content -->
    <div class="form">
      <label class="label">Select a Board</label>
      <select class="select-board">
        <option value="General">General</option>
        <option value="QnA">QnA</option>
        <option value="Jobs">Jobs</option>
      </select>

      <label class="label">Please enter the title.</label>
      <input type="text" class="title-input" placeholder="Enter title here" />

      <input type="text" class="description-input" placeholder="Ask any questions or stories you're curious about." v-model="description" />
    </div>
  </div>
</template>

<script>
export default {
  name: "WritingForm",
  data() {
    return {
    selectedBoard: "", // Holds the selected board option
    title: "",         // Holds the title input
    description: "",   // Holds the description input
    };
  },
};
</script>

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

.back-button, .completion-button {
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

.select-board, .title-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
}

.description {
  color: #888;
  font-size: 14px;
}
</style>
