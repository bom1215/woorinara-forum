<script setup>

defineProps({
  time: String,
  nickName: String,
  content: String,
  isMine: Boolean,
});

</script>
<template>
  <div class="comment">
    <div class="comment-header">
        <img src="@/assets/childReply.svg" alt="icon" />
      <span class="nickName">{{ nickName }}</span>
      <span class="time">{{ time }}</span>
      <div v-if="isMine" class="cancel">
        <img src="@/assets/cancel.svg" alt="cancel icon" />
        </div>
    </div>
    <p class="content"> {{ content }}</p>
  </div>
</template>
<style scoped>
.comment {
  padding: 12px 0;
  /* border-top: 1px solid #e0e0e0; */
  font-family: Arial, sans-serif;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #5c687a;
  font-size: 14px;
}

.nickName {
  font-weight: bold;
  color: #272c33;
}

.time {
  color: #929aa6;
  font-size: 14px;
}

.content {
  margin: 8px 0;
  color: #272c33;
  font-size: 16px;
  padding-left: 30px; 

}
.cancel {
  margin-left: auto;
}
</style>
