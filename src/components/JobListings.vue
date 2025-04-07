<script setup>
import jobData from '@/components/jobs.json'
import JobListing from './JobListing.vue';
import { ref, reactive, defineProps, onMounted } from 'vue';
import ViewJobs from './ViewJobs.vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const props = defineProps({
    limit: {
        type: Number,
        default: null
    },
    
    showButton : {
        type : Boolean,
        default : false
    },
})

console.log(props.limit);

const state =  reactive({
    jobs : [],
    isLoading : false
})

const getJobs = async () =>{
    const url = 'https://jobs-api-with-express-js.onrender.com/api/posts'
    state.isLoading = true
        try {
            const response = await axios.get(url)
            state.jobs = response.data
            // console.log(jobs.value);
        } catch (error) {
            console.error(error);
        }finally{
            state.isLoading = false
            console.log(state.jobs);
        }
        
    }

    onMounted(getJobs)

</script>

<template>
    <section class="bg-slate-200 px-4 py-10 mx-2 rounded-lg">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>

            <div v-if="state.isLoading" class="text-center">
                <PulseLoader/>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing  v-for="job in state.jobs.slice(0, props.limit ?? state.jobs.length)" :key="job.id" :jobss="job"/>
            </div>

        </div>
    </section>
    <ViewJobs v-if="showButton"/>
</template>