<template>
    <!-- 暂时不分开 -->
    <div
        v-if="type == 'daterange1'"
        class="picker-wrap-inner"
    >
        <el-date-picker
            v-model="activeValue[0]"
            size="mini"
            :value-format="valueFormat"
            :class="{'search-item-active': activeValue[0]}"
            class="picker"
            :placeholder="startPlaceholder"
            @change="val => { handleChange(val, 0) }"
        /><div class="separator">
            {{ rangeSeparator }}
        </div><el-date-picker
            v-model="activeValue[1]"
            size="mini"
            :value-format="valueFormat"
            :class="{'search-item-active': activeValue[1]}"
            class="picker"
            :placeholder="endPlaceholder"
            @change="val => { handleChange(val, 1) }"
        />
    </div>
    <el-date-picker
        v-else
        v-model="activeValue"
        :size="size"
        :unlink-panels="unlinkPanels"
        :value-format="valueFormat"
        :type="type"
        :range-separator="rangeSeparator"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :picker-options="pickerOptions"
        @change="handleChange"
    />
</template>

<script>
export default {
    name: 'EsDatePicker',
    components: {

    },
    mixins: [],
    props: {
        value: [
            String,
            Array,
            Number
        ],
        type: {
            type: String
        },
        rangeSeparator: {
            type: String,
            default: '至',
        },
        startPlaceholder: {
            type: String,
            default: '开始日期',
        },
        endPlaceholder: {
            type: String,
            default: '结束日期',
        },
        valueFormat: {
            type: String,
            default: 'timestamp'
        },
        size: {
            type: String
        },
        unlinkPanels: {
            type: Boolean,
            default: true
        },
        pickerOptions: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            activeValue: '',
        }
    },
    computed: {
    },
    watch: {
        value: {
            handler(val, oldVal) {
                this.activeValue = this.transformDate(val, 1)
            },
            immediate: true
        }
    },
    created() {
    },
    methods: {
        /**
         * 转换时间
         * @param  {Array|Number} val  要转换的值
         * @param  {Number} mode 1 - 乘， 0 - 除
         * @return {Array|Number}      结果
         */
        transformDate(val, mode) {
            // 引入值时
            if (this.type == 'daterange' && !val) {
                val = []
            }
            // 时间戳转换
            if (this.valueFormat == 'timestamp') {
                if (mode == 1) {
                    // 将时间戳转换成毫秒
                    if (this.type != 'daterange') {
                        // val = val != 0 ? val * 1000 : (new Date()).valueOf()
                        val = val ? (`${val * 1000}`) : ''
                    } else {
                        // 不要使用map，保证val不变，否则会进入死循环
                        val = val.map(item => item * 1000)
                        // val[0] = val[0] * 1000
                        // val[1] = val[1] * 1000
                    }
                } else {
                    // 将时间戳转换成秒
                    if (this.type != 'daterange') {
                        val = parseInt(val / 1000)
                    } else {
                        val = val.map(item => item / 1000)
                        // val[0] = val[0] / 1000
                        // val[1] = val[1] / 1000
                    }
                }
            }
            // 抛出值时
            /*if (!mode && this.type == 'daterange' && !val[0] && !val[1]) {
                val = ''
            }*/
            return val
        },
        handleChange(val, index) {
            /*if (this.type == 'daterange') {
                if (index) {
                    val = [this.activeValue[0], val]
                } else {
                    val = [val, this.activeValue[1]]
                }
            }*/
            let _val = this.transformDate(val, 0)
            this.$emit('input', _val)
            this.$emit('change', _val)
        },
    },
}
</script>

<style scoped>
.picker-wrap-inner {
    width: 100%;
    .separator {
        display: inline-block;
        width: 10%;
        text-align: center;
    }
    .picker {
        width: 45%;
    }
}
</style>
