<script setup>
import { ref, computed } from 'vue'
import Home from './pages/Home.vue';
import CreatePost from './pages/CreatePost.vue';
import Post from './pages/Post.vue';

const routes = {
  '/': Home,
  '/create': CreatePost,
  '/post' : Post
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/create">CreatePost</a> |
  <a href="#/post">Post</a> |
  <component :is="currentView" />

</template>