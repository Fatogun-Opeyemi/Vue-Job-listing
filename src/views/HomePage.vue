<script setup>
    import Hero from '@/components/Hero.vue';
    import HomeCards from '@/components/HomeCards.vue';
    // import BrowseJobs from '@/components/BrowseJobs.vue';
    // import ViewJobs from '@/components/ViewJobs.vue';
    import JobListings from '@/components/JobListings.vue';
</script>

<template>
    <Hero test="Become a Vue dev" subtitle="Find the Vue job that fits your skillset and needs"/>
    <HomeCards/>
    <JobListings :limit="3" :show-button='true'/>
</template>