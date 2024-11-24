<script setup>
import "../assets/fonts/pretendard-jp.css";
import { sendLikes } from "@/services/postAPI";
import { ref } from "vue";
const props = defineProps({
  forumId: Number,
  likes: Number,
  viewCnt: Number,
  commentNum: Number,
  isHeart: Boolean
});

const localIsHeart = ref(props.isHeart);
const localLikes = ref(Number(props.likes)); // 내부 상태 변수로 likes 관리

async function fetchLikes() {
  try {
    const likes = await sendLikes(props.forumId); // 서버에서 좋아요 처리 결과 가져오기
    if (likes !== null && likes !== undefined) {
      localLikes.value = likes; // props.likes 대신 localLikes 업데이트
      localIsHeart.value = !localIsHeart.value; // 좋아요 상태 변경
      console.log("Send Like to server complete");
    }
  } catch (error) {
    console.error("Error sending like:", error);
  }
}
</script>
<template>
  <div class="footer">
    <span class="views">
      <img alt="view logo" src="../assets/view.svg" />
      {{ viewCnt }}
    </span>
    <div class="right">
      <span class="likes">
        <img
          alt="like logo"
          src="../assets/emptyLike.svg"
          v-if="!localIsHeart"
          @click="fetchLikes"
        />
        <img
          alt="like logo"
          src="../assets/like.svg"
          v-if="localIsHeart"
          @click="fetchLikes"
        />
        {{ localLikes }}
      </span>
      <span class="comments">
        <img alt="comment logo" src="../assets/comment.svg" />
        {{ commentNum }}
      </span>
    </div>
  </div>
</template>
<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
}

.views {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.right {
  display: flex;
  align-items: center;
  gap: 20px; /* 아이콘 간 간격 */
}

.footer img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
