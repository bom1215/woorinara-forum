<script setup>
import { ref, computed } from 'vue'
import Home from './pages/Home.vue';
import CreatePost from './pages/CreatePost.vue';
import Post from './pages/Post.vue';

// const routes = {
//   '/': Home,
//   '/create': CreatePost,
//   '/post' : Post
// }

// const currentPath = ref(window.location.hash)

// window.addEventListener('hashchange', () => {
//   currentPath.value = window.location.hash
// })
// const currentView = computed(() => {
//   return routes[currentPath.value.slice(1) || '/'] || NotFound
// })
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/post/new">createPost</RouterLink>
    <RouterLink to="/post/qna/1">Q&A_sameple_post</RouterLink>
    <RouterLink to="/post/general/1">General_sameple_post</RouterLink>
    <RouterLink to="/post/jobs/1">Jobs_sameple_post</RouterLink>
    <RouterLink to="/notice/bombom12">Notice</RouterLink>
    <RouterLink to="/search/word">Search_sample</RouterLink>
    <RouterLink to="/comment/nestedReply">NestedReply</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>

</template>