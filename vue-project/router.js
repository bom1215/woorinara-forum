import CommentDetail from "@/pages/CommentDetail.vue";
import CreatePost from "@/pages/CreatePost.vue";
import Home from "@/pages/Home.vue";
import Notice from "@/pages/Notice.vue";
import Post from "@/pages/Post.vue";
import Search from "@/pages/Search.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/post/new", component: CreatePost },
  {
    path: "/post/edit/:forumId",
    name: "EditPost",
    component: CreatePost,
    props: (route) => ({
      forumId: route.params.forumId,
      edit: route.query.edit === "true", // 쿼리 문자열로 전달된 값 처리
      forumCategory: route.query.forumCategory,
      header: route.query.header,
      headerColor: route.query.headerColor,
      title: route.query.title,
      postContent: route.query.postContent,
    }),
  },
  { path: "/post/:forumId", component: Post },
  { path: "/post/:forumId/alarmId/:alarmId", component: Post},
  { path: "/notice", component: Notice },
  { path: "/search", component: Search },
  { path: "/commentDetail", component: CommentDetail },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
