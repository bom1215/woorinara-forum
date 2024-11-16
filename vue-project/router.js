import ChildReply from "@/components/ChildReply.vue";
import CreatePost from "@/pages/CreatePost.vue";
import Home from "@/pages/Home.vue";
import Notice from "@/pages/Notice.vue";
import Post from "@/pages/Post.vue";
import Search from "@/pages/Search.vue";
import Headers from "@/components/Headers.vue";
import { createRouter, createWebHistory } from "vue-router";
import Modal from "@/components/shared/modal.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/post/new', component: CreatePost },
    { path: '/post/:forumCategory/:forumId', component: Post },
    { path: '/notice/:userid', component: Notice},
    { path: '/search/:word', component: Search },
    { path: '/comment/childReply', component: ChildReply },
    { path: '/headers', component: Headers },
    { path: '/modal', component: Modal }

    

    
    
    
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router