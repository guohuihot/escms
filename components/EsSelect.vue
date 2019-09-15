<template>
    <el-select
        v-model="selValue"
        clearable
        :size="size"
        :class="{'search-item-active': (selValue || selValue === 0) && !disabled}"
        :style="{width: width + 'px'}"
        :placeholder="placeholder"
        :disabled="disabled"
        @clear="clear"
        @change="change"
    >
        <el-option
            v-for="(item, i) in data"
            :key="i"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

<script>
export default {
    name: 'EsSelect',
    props: {
        value: {},
        width: {
            type: Number,
            default: 100
        },
        placeholder: {
            type: String
        },
        size: {
            type: String,
            default: 'mini'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array
        }
    },
    data() {
        return {
            selValue: ''
        }
    },
    computed: {
    },
    watch: {
        value: {
            handler(val, oldVal) {
                this.selValue = val
            },
            immediate: true
        },
    },
    created() {
    },
    methods: {
        change() {
            this.$emit('input', this.selValue)
            this.$emit('change', this.selValue)
        },
        clear() {
            this.$emit('clear')
        }
    },
}
</script>
