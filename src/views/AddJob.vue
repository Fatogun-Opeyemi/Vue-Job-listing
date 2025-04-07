<script setup>
    import axios from 'axios';
    import { reactive, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const router = useRouter();
    const url = 'https://jobs-api-with-express-js.onrender.com/api/posts';

    const form =  reactive({
        type : 'Full-Time',
        title : '',
        description : '',
        salary : '$50 - $60K',
        location : '',
        companyName: '',
        companyDescription : '',
        companyEmail : '',
        companyPhone : ''
    })
    
    const getJobs = async () =>{
        const response = await axios.get(url)
        console.log(response)
    }


    const handleSubmit = async () =>{
        const newJob = {
            "title" : form.title,
            "type" : form.type,
            "description" : form.description,
            "location" : form.location,
            "salary" : form.salary,
            "company" : {
                "name" : form.companyName,
                "description" :  form.companyDescription,
                "contactEmail" : form.companyEmail,
                "contactPhone" : form.companyPhone
            }
        }
        console.log(newJob);

        try {
            const response = await axios.post(url , newJob)
            router.push(`/jobs/`)
            toast.success('Job successfully added')
        } catch (error) {
            console.error(error);
            toast.error(error)
        }
    } 

    onMounted(getJobs)
</script>

<template>
    <!-- <div> {{ state.jobs.id}}</div> -->
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>
                        <select id="type" name="type" class="border rounded w-full py-2 px-3" required v-model="form.type">
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                        <input type="text" id="name" name="name" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. Beautiful Apartment In Miami" required v-model="form.title"/>
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea id="description" name="description" class="border rounded w-full py-2 px-3" rows="4"
                            placeholder="Add any job duties, expectations, requirements, etc" v-model="form.description"></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="type" class="block text-gray-700 font-bold mb-2">Salary</label>
                        <select id="salary" name="salary" class="border rounded w-full py-2 px-3" required v-model="form.salary">
                            <option value="Under $50K">under $50K</option>
                            <option value="$50K - $60K">$50 - $60K</option>
                            <option value="$60K - $70K">$60 - $70K</option>
                            <option value="$70K - $80K">$70 - $80K</option>
                            <option value="$80K - $90K">$80 - $90K</option>
                            <option value="$90K - $100K">$90 - $100K</option>
                            <option value="$100K - $125K">$100 - $125K</option>
                            <option value="$125K - $150K">$125 - $150K</option>
                            <option value="$150K - $175K">$150 - $175K</option>
                            <option value="$175K - $200K">$175 - $200K</option>
                            <option value="Over $200K">Over $200K</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">
                            Location
                        </label>
                        <input type="text" id="location" name="location" class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="Company Location" required v-model="form.location" />
                    </div>

                    <h3 class="text-2xl mb-5">Company Info</h3>

                    <div class="mb-4">
                        <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
                        <input type="text" id="company" name="company" class="border rounded w-full py-2 px-3"
                            placeholder="Company Name" v-model="form.companyName" />
                    </div>

                    <div class="mb-4">
                        <label for="company_description" class="block text-gray-700 font-bold mb-2">Company
                            Description</label>
                        <textarea id="company_description" name="company_description"
                            class="border rounded w-full py-2 px-3" rows="4"
                            placeholder="What does your company do?" v-model="form.companyDescription"></textarea>
                    </div>

                    <div class="mb-4">
                        <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
                        <input type="email" id="contact_email" name="contact_email"
                            class="border rounded w-full py-2 px-3" placeholder="Email address for applicants"
                            required v-model="form.companyEmail" />
                    </div>
                    <div class="mb-4">
                        <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
                        <input type="tel" id="contact_phone" name="contact_phone"
                            class="border rounded w-full py-2 px-3" placeholder="Optional phone for applicants" v-model="form.companyPhone" />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Add Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>