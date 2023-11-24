import {createRouter, createWebHistory} from 'vue-router'
import Register from '../pages/RegisterComponent.vue'
import Login from '../pages/LoginComponent.vue'
import Home from '../pages/HomeComponent.vue'
import Post from "../pages/PostComponent.vue";
import Allpost from "../pages/AllPostsComponent.vue";
import PostComment from "../pages/UserComentComponent.vue";

const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    },

    {
        path: '/home',
        name: 'home',
        component: Home
    },

    {
        path: '/create-post',
        name: 'create-post',
        component: Post
    },

    {
        path: '/all-post',
        name: 'all-post',
        component: Allpost
    },

    {
        path: '/post-comments/:id',
        name: 'post-comments',
        component: PostComment
    },



]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
