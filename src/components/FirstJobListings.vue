<script setup>
import jobData from '@/components/jobs.json'
import JobListing from './JobListing.vue';
import { ref, defineProps } from 'vue';
import ViewJobs from './ViewJobs.vue';

const props = defineProps({
    limit: {
        type: Number,
        default: null
    },
    
    showButton : {
        type : Boolean,
        default : false
    }
})

console.log(props.limit);

const jobs = ref(jobData.jobs)

</script>

<template>
    <section class="bg-slate-200 px-4 py-10 mx-2 rounded-lg">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing  v-for="job in jobs.slice(0, props.limit ?? jobs.length)" :key="job.id" :jobss="job"/>
            </div>
        </div>
    </section>
    <ViewJobs v-if="showButton"/>
</template>