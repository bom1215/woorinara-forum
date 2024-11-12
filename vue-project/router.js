import NestedReply from "@/components/NestedReply.vue";
import CreatePost from "@/pages/CreatePost.vue";
import Home from "@/pages/Home.vue";
import Notice from "@/pages/Notice.vue";
import Post from "@/pages/Post.vue";
import Search from "@/pages/Search.vue";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    { path: '/', component: Home },
    { path: '/post/new', component: CreatePost },
    { path: '/post/qna/:postid', component: Post },
    { path: '/post/general/:postid', component: Post},
    { path: '/post/jobs/:postid', component: Post },
    { path: '/notice/:userid', component: Notice},
    { path: '/search/:word', component: Search },
    { path: '/comment/nestedReply', component: NestedReply },

    
    
    
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router