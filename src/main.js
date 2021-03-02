import { createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/ViewHome";
import ViewArticle from "@/views/ViewArticle";
import PageNotFound from "@/views/ViewNotFound";
import store from "@/datas/store";

const app = createApp(App).use(store)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path : '/',
            name: "Home",
            component: Home,
        },
        {
            path: '/article/:slug',
            name: "ViewArticle",
            component: ViewArticle,
            props: true
        },
        // Todo create not found view
        { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
    ]
})

app.use(router)

app.use(store)

app.mount('#app')

