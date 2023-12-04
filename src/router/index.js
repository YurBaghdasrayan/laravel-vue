import {createRouter, createWebHistory} from 'vue-router'
import Register from '@/pages/RegisterComponent.vue'
import Login from '@/pages/LoginComponent.vue'
import Home from '@/pages/HomeComponent.vue'
import Post from "@/pages/PostComponent.vue";
import Allpost from "@/pages/AllPostsComponent.vue";
import PostComment from "@/pages/UserComentComponent.vue";
import EditPosts from "@/pages/EditPostsComponent.vue";
import ShowPost from "@/pages/ShowComponent.vue";
import ModeratorLogin from "@/pages/moderator/LoginComponent.vue"
import ModeratorHome from "@/pages/moderator/HomeComponent.vue"
import ModeratorAllPosts from "@/pages/moderator/AllPostsComponent.vue"
import PostComponent from "@/pages/moderator/PostComponent.vue"
import ModeratorShowPost from "@/pages/moderator/ShowComponent.vue"
import ModeratorEditPosts from "@/pages/moderator/ModeratorEditPosts.vue"

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
        path: '/create/post',
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

    {
        path: '/edit/posts/:id',
        name: 'edit.post',
        component: EditPosts
    },

    {
        path: '/show-post/:id',
        name: 'show.post',
        component: ShowPost
    },

// Moderator

    {
        path: '/moderator-login',
        name: 'moderator-login',
        component: ModeratorLogin
    },

    {
        path: '/moderator/home',
        name: 'moderator.home',
        component: ModeratorHome
    },

    {
        path: '/moderator/posts',
        name: 'moderator/posts',
        component: ModeratorAllPosts
    },

    {
        path: '/moderator/create/post',
        name: 'moderator/create/post',
        component: PostComponent
    },

    {
        path: '/moderator/show/post/:id',
        name: 'moderator.show.post',
        component: ModeratorShowPost
    },

    {
        path: '/moderator/edit/post/:id',
        name: 'moderator.edit.post',
        component: ModeratorEditPosts
    },


]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
