<script setup>
import Comment from "@/components/Comment.vue";
import Article from "@/components/Article.vue";
import { ref, onMounted } from "vue";
import { readPostDetail } from "@/services/postAPI.js";
import { timeAgo } from "@/utils/timeCal/calculateTime";
import { useRoute } from 'vue-router';
import CommentInput from "@/components/CommentInput.vue";

// const article = ref({
//   tag: "Visa",
//   time: "7시간 전",
//   title: "Questions About Required Documents",
//   author: "zypher",
//   content: "Lorem ipsum dolor sit amet consectetur. In diam adipiscing elit morbi. Malesuada feugiat non tellus sagittis commodo sit. Ultrices phasellus etest sagittis. Quis maecenas in laoreet fusce in gravida morbi. Sit id nuncid est.",
//   likes: "1.4k",
//   headerColor: "green",
//   forumHeader: "QnA",
//   commentList: [
//             {
//                 "commentId": 5,
//                 "memberId": 32,
//                 "memberName": "leeseokwoon5",
//                 "parentCommentId": null,
//                 "content": "This is Parent Comment",
//                 "createdAt": "2024-11-11T21:34:43.39316",
//                 "updatedAt": "2024-11-11T21:34:43.39316",
//                 "childList": [
//                     {
//                         "commentId": 6,
//                         "memberId": 32,
//                         "memberName": "leeseokwoon5",
//                         "parentCommentId": 5,
//                         "content": "This is Child Comment1",
//                         "createdAt": "2024-11-11T21:36:05.16010",
//                         "updatedAt": "2024-11-11T21:36:05.16010",
//                         "childList": []
//                     },
//                     {
//                         "commentId": 8,
//                         "memberId": 32,
//                         "memberName": "leeseokwoon5",
//                         "parentCommentId": 5,
//                         "content": "This is Child Comment1",
//                         "createdAt": "2024-11-11T22:01:41.60572",
//                         "updatedAt": "2024-11-11T22:01:41.60572",
//                         "childList": []
//                     }
//                 ]
//             },
//             {
//                 "commentId": 7,
//                 "memberId": 32,
//                 "memberName": "leeseokwoon5",
//                 "parentCommentId": null,
//                 "content": "This is Parent Comment",
//                 "createdAt": "2024-11-11T22:01:28.41458",
//                 "updatedAt": "2024-11-11T22:01:28.41458",
//                 "childList": [
//                     {
//                         "commentId": 9,
//                         "memberId": 32,
//                         "memberName": "leeseokwoon5",
//                         "parentCommentId": 7,
//                         "content": "This is Child Comment1",
//                         "createdAt": "2024-11-11T22:01:50.68713",
//                         "updatedAt": "2024-11-11T22:01:50.68713",
//                         "childList": []
//                     }
//                 ]
//             }
//         ],

// })
const postContent = ref(null);
async function fetchPosts(forumId) {
  const response = await readPostDetail(forumId);
  console.log(response)
  if (response) {
    postContent.value = {
      forumId: response.forumId,
      title: response.title,
      content: response.content,
      forumCategory: response.forumCategory,
      tag: response.forumHeader ? response.forumHeader.name : null,
      headerColor: response.forumHeader ? response.forumHeader.color : null,
      time: timeAgo(response.updateAt),
      author: response.nickName,
      likes: String(response.heartNum),
      commentList: response.commentList,
    };
    console.log(postContent);

  }
}
const route = useRoute(); // 라우터 정보 가져오기

onMounted(() => {
  const id  = route.params.forumId; // 라우터 파라미터에서 id 가져오기
  fetchPosts(id);
});


// const commentKey = ref(0); // Unique key for the Comment component
// function forceReRender() {
//   commentKey.value++; // Increment key to trigger re-render
// }

</script>
<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <button class="back-button">
        <img alt="Back logo" src="../assets/back.svg" />
      </button>
      <h2>QnA</h2>
    </div>
    <div v-if="postContent">
      <!-- Article Section -->
      <Article 
        :tag="postContent.tag"
        :time="postContent.time"
        :title="postContent.title"
        :author="postContent.author"
        :content="postContent.content"
        :likes="postContent.likes"
        :headerColor="postContent.headerColor"
        :forumCategory="postContent.forumHeader"
      />
      <!-- Comment Section -->
      <div v-if="postContent.commentList.length > 0" >
        <Comment
          :replies="postContent.commentList"
          :forumId="postContent.forumId" 
          />
      </div>
      <div v-if="postContent.commentList.length === 0" >
        <CommentInput
        :forumId="postContent.forumId"/>
      </div>


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
  align-items: center;
  padding-bottom: 10px;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
}
.reply-count {
  margin-top: 20px;
  color: #888;
  font-size: 14px;
}

.reply-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.reply-input input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
}

.reply-input button {
  background: none;
  border: none;
  font-size: 18px;
}

.reply-list {
  margin-top: 20px;
}

.reply-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.reply-author,
.reply-time {
  color: #888;
  font-size: 14px;
}

.reply-content {
  margin-top: 5px;
  font-size: 16px;
}

.reply-button {
  background: none;
  color: #0066cc;
  border: none;
  font-size: 14px;
  margin-top: 5px;
  cursor: pointer;
}
</style>
