<template>
    <div class="container">
        <div>
            <h1 class="title">
                admin1
            </h1>
            {{ data }}
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
    components: {
        Logo
    },

    async asyncData({ params }) {
        let res = await axios.get(`http://localhost:3000/api/category`)
        console.log(res.data)
        return {
            data: res.data.data
        }
    }
}
</script>

<style>
</style>
