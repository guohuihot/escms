<template>
    <el-select
        v-model="defValue"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
    >
        <el-option
            v-for="item in options"
            :key="item.type_id"
            :label="item.type_name"
            :value="item.type_id"
        />
    </el-select>
</template>

<script>

import { ajax } from '@/fetch/api'

export default {
    name: 'EsFormTag',
    components: {
    },
    mixins: [],
    props: {
        url: {
            type: String,
            default: 'ARTICLE__CATEGORIES_EDIT',
        },
        value: {
        }
    },
    data() {
        return {
            options: [],
            defValue: [],
            list: [],
            loading: false
        }
    },
    computed: {
    },
    watch: {

    },
    created() {
    },
    mounted() {
    },
    methods: {
        ajax,
        remoteMethod(q) {
            if (q !== '') {
                this.loading = true
                this.ajax({
                    url: 'ARTICAL_FORM_TAG',
                    data: {
                        q
                    }
                })
                    .then((res) => {
                        this.loading = false
                        this.options = res.data.list
                    })
                    .catch(() => {
                        this.loading = false
                    })
            } else {
                this.options = []
            }
        }
    },
}
</script>

<style scoped>
</style>
