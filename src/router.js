import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Tasks from "@/views/Tasks";

Vue.use(Router);
export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/tasks',
            component: Tasks
        }
    ]
});