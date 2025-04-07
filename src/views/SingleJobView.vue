<script setup>
    import { reactive, onMounted, defineProps } from 'vue';
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import { useRoute, RouterLink, useRouter } from 'vue-router';
    import BackButton from '@/components/BackButton.vue';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const route = useRoute()
    const jobId = route.params.id

    const state =  reactive({
        job : {},
        isLoading : false
    })

    const url = `https://jobs-api-with-express-js.onrender.com/api/posts/${jobId}`
    
    const getJobs = async () =>{
    state.isLoading = true
        try {
            const response = await axios.get(url)
            console.log(response);
            
            state.job = response.data
            console.log(state.job);
            
            // console.log(jobs.value);
        } catch (error) {
            console.error(error);
        }finally{
            state.isLoading = false
            console.log(state.job);
            
        }
        
    }

    onMounted(getJobs)

    const router = useRouter()
    const deleteJob = async () =>{
        try {
            const confamu = confirm('Are you sure?')

            if (confamu){
                await axios.delete(url)
                router.push('/jobs')
                toast.success('Job deleted successfully')
            }else{
                toast.error('Looks like you changed your mind')
            }
                
        } catch (error) {
         console.log(error);
         toast.error(error)
            
        }
        
    }
</script>

<template>
    <BackButton/>
    <section class="bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div v-if="state.job && state.job.type"  class="text-gray-500 mb-4"> {{ state.job.type }}</div>
                        <h1 v-if="state.job && state.job.title"  class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
                        <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                            <i class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                            <p v-if="state.job && state.job.location"  class="text-orange-700">{{ state.job.location }}</p>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-green-800 text-lg font-bold mb-6">
                            Job Description
                        </h3>

                        <p v-if="state.job && state.job.description"  class="mb-4">
                            {{ state.job.description}}
                        </p>

                        <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

                        <p v-if="state.job && state.job.salary"  class="mb-4">{{state.job.salary}} / Year</p>
                    </div>
                </main>

                <!-- Sidebar -->
                <aside>
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>

                        <h2 v-if="state.job.company && state.job.company.name"  class="text-2xl">{{ state.job.company.name }} </h2>

                        <p v-if="state.job.company && state.job.company.description"  class="my-2">
                            {{ state.job.company.description }}
                        </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>

                        <p v-if="state.job.company && state.job.company.contactEmail"  class="my-2 bg-green-100 p-2 font-bold">
                            {{ state.job.company.contactEmail}}
                        </p>

                        <h3 class="text-xl">Contact Phone:</h3>

                        <p v-if="state.job.company && state.job.company.contactPhone"  class="my-2 bg-green-100 p-2 font-bold">{{ state.job.company.contactPhone }} </p>
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink :to="`/jobs/${state.job._id}/edit`"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                                Edit Job
                        </RouterLink>
                        <button @click="deleteJob"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Job
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>