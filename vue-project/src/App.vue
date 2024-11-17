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
    <RouterLink to="/notice">Notice</RouterLink>

  </nav>
  <main>
    <RouterView />
  </main>

</template>