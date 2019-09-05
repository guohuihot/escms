<template>
    <div class="container">
        <div>
            <h1 class="title">
                escms1
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

    asyncData: async ({ params }) => {
        let res = await axios.get(`http://localhost:3000/api/category`)
        console.log(res.data)
        return {
            data: res.data.data
        }
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
