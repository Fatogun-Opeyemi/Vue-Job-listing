<script setup>
    import { defineProps, ref, computed } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        jobss : {
            type : Object,
            required: true,
        }
    })

    const showFullDescription = ref(false)

    const truncatedDescription = computed(()=>{
        let description = props.jobss.description

        if(!showFullDescription.value){
            description = description.substring(0,90) + ' ...'
        }return description
    })

    const toggleDescription = () =>{
        showFullDescription.value = ! showFullDescription.value
    }
</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
                    <div class="p-4">
                        <div class="mb-6">
                            <div class="text-gray-600 my-2">  {{ props.jobss.type }}  </div>
                            <h3 class="text-xl font-bold">{{ props.jobss.title }}</h3>
                        </div>

                        <div class="mb-5"> {{truncatedDescription }} </div>
                        <button @click="toggleDescription" class=" bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg cursor-pointer">
                            {{ !showFullDescription ? 'More' : 'Less' }}
                        </button>

                        <h3 class="text-green-500 mb-2 mt-4">{{ props.jobss.salary }} / Year</h3>

                        <div class="border border-gray-100 mb-5"></div>

                        <div class="flex flex-col lg:flex-row justify-between mb-4">
                            <div class="text-orange-700 mb-3">
                                <i class="pi pi-map-marker text-lg inline"></i>
                                    {{ props.jobss.location }}
                            </div>
                            <RouterLink :to="`/jobs/${props.jobss._id}`"
                                class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                                Read More
                            </RouterLink>
                        </div>
                    </div>
                </div>
</template>