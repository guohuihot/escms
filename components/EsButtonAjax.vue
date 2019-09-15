<template>
    <span>
        <el-button
            :title.native="title"
            :type="type"
            :size="size"
            :plain="plain"
            :disabled="disabled"
            :style="btnStyle"
            @click="handleClick"
        ><slot>{{ title }}</slot></el-button>
    </span>
</template>

<script>

import button from '@/components/mixins/button'

export default {
    components: {
    },
    mixins: [button],
    props: {
        url: {
            type: String,
            default: ''
        },
        id: { //Help id
            type: [
                String,
                Number,
                Array
            ],
            default: ''
        },
        clickBefore: {
            type: Function,
            default() {
                return () => true
            }
        },
        info: {
            type: String,
            default: '确定执行此操作吗？'
        },
        title: {
            type: String,
            default: '提示'
        },
        dangerouslyUseHTMLString: {
            type: Boolean,
            default: false
        },
        method: {
            type: String,
            default: 'post'
        },
        isConfirm: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            data: {
            },
        }
    },
    computed: {
    },
    methods: {
        handleClick() {
            if (!this.clickBefore()) {
                return
            }
            if (this.isConfirm) {
                this.$confirm(this.info, this.title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    dangerouslyUseHTMLString: this.dangerouslyUseHTMLString
                }).then(this.handleAjax)
            } else {
                this.handleAjax()
            }
        },
        handleAjax() {
            if (this.id) {
                this.params.id = this.id
            }
            this.$axios({
                url: this.url,
                method: this.method,
                data: this.params
            }).then(res => {
                this.$emit('ajaxThen', res)
            })
        }
    }
}
</script>

<style scoped></style>
