<template>
    <div
        v-loading="loading"
        style="background-color: #fff;overflow: hidden;"
    >
        <es-form
            :url="URL"
            :form-items="formItems"
            style="width: 600px;margin: 15px 0;"
            :data="data"
        />
    </div>
</template>
<script>
import EsForm from '@/components/EsForm'

export default {
    components: {
        EsForm
    },
    mixins: [],
    data() {
        return {
            URL: 'api/config',
            loading: false,
            data: {

            },
            formItems: [
                /*{
                    label: '网站Logo',
                    type: 'image',
                    name: 'site_logo'
                },*/
                {
                    label: '网站标题',
                    name: 'site_name'
                },
                {
                    label: '网站版权',
                    type: 'textarea',
                    name: 'copyright'
                },
            ],
        }
    },
    computed: {},
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.loading = true
            this.$axios({
                url: this.URL
            }).then(res => {
                this.data = res.data
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        }
    }
}
</script>
