import { createRouter, createWebHistory } from "vue-router";
import SingleJobView from "@/views/SingleJobView.vue";
import HomePage from "@/views/HomePage.vue";
import JobViews from "@/views/JobViews.vue";
import NotFound from "@/views/NotFound.vue";
import EditJob from "@/views/EditJob.vue";
import AddJob from "@/views/AddJob.vue";

const router = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {
            path : '/',
            name : 'home',
            component : HomePage,
        },
        {
            path : '/jobs',
            name : 'jobs',
            component : JobViews,
        },
        {
            path : `/jobs/:id`,
            name : 'job',
            component : SingleJobView,
        },
        {
            path : `/add-job`,
            name : 'addjob',
            component : AddJob,
        },
        {
            path : `/jobs/:id/edit`,
            name : 'editJob',
            component : EditJob,
        },
        {
            path : '/:catchAll(.*)',
            name : 'not-found',
            component : NotFound,
        },
    ]
})

export default router;