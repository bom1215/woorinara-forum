<script setup>
import ChildReply from './ChildReply.vue';
import { timeAgo } from "@/utils/timeCal/calculateTime";

defineProps({
  time: String,
  author: String,
  content: String,
  childList: {
    type: Array,
    default: () => [],
  }
});

</script>
<template>
  <div class="comment">
    <div class="comment-header">
      <span class="author">{{ author }}</span>
      <span class="time">{{ time }}</span>
      <div class="cancel">
        <img src="@/assets/cancel.svg" alt="cancel icon" />
        </div>
    </div>
    <p class="content"> {{ content }}</p>
    <a href="#" class="reply-link">Reply</a>
    <div class="child-replies">
      <ChildReply
        v-for="child in childList"
        :key="child.commentId"
        :time="timeAgo(child.updatedAt)"
        :author="child.memberName"
        :content="child.content"
      />
    </div>
  </div>
</template>
<style scoped>
.comment {
  padding: 12px 0;
  /* border-bottom: 1px solid #e0e0e0; */
  font-family: Arial, sans-serif;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #5c687a;
  font-size: 14px;
}

.author {
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
}

.reply-link {
  color: #3b8aff;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
}

.reply-link:hover {
  text-decoration: underline;
}
.cancel {
  margin-left: auto;
}
</style>
