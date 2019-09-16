<template>
    <span
        :style="style"
        @click="getUrl"
        v-html="captcha"
    />
</template>
<script>
export default {
    name: 'EsCaptcha',
    props: {
        width: {
            type: Number,
            default: 160
        },
        height: {
            type: Number,
            default: 60
        },
    },
    data () {
        return {
            captcha: ''
        }
    },
    computed: {
        style() {
            return {
                cursor: 'pointer',
                display: 'inline-block'
            }
        }
    },
    created() {
        this.getUrl()
    },
    methods: {
        async getUrl() {
            const res = await this.$axios.get(`/api/captcha`, {
                params: {
                    width: this.width,
                    height: this.height,
                }
            })
            this.captcha = res.data
        }
    }
}
</script>

<style>
</style>
