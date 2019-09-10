<template>
    <!-- 由于异步不能使用v-model直接更新value -->
    <el-cascader
        v-model="actValue"
        :disabled="disabled"
        :size="size"
        :class="{'search-item-active': actValue && actValue.length}"
        clearable
        separator="-"
        :options="data"
        :props="positionProps"
        change-on-select
        @change="change"
    />
</template>

<script>

export default {
    name: 'EsCascader',
    components: {
    },
    filters: {
    },
    mixins: [],
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        level: {
            type: Number,
            default: 2
        },
        size: {
            type: String,
            default: 'small'
        },
        width: {
            type: [
                String,
                Number
            ],
            default: 290
        },
        value: {
            type: Array,
            default() {
                return []
            }
        },
        uRL: {
            type: String,
            default: 'CLASS_AREAS'
        },
    },
    data() {
        return {
            positionProps: {
                label: 'title',
                value: 'id',
            },
            actValue: [],
            // 当前省列表
            data: [],
            loaded: false
        }
    },
    computed: {
    },
    watch: {
        // 默认值
        value: {
            handler: 'init',
            immediate: true
        }
    },
    methods: {
        init(val, oldVal) {
            this.actValue = (val && val.length) ? val : [1]
            let _init = async () => {
                let res = await this.getData()
                let res1 = await this.getData(this.actValue[0])
            }
            if (!this.loaded) {
                _init()
                this.loaded = true
            }
        },
        change(parent_id) {
            this.getData(parent_id)
            this.$emit('input', this.actValue)
            this.$emit('change', this.actValue)
        },
        getData(parent_id = 1) {
            let activeData = this.data.find(item => item.id == parent_id)
            // 级别限制
            if (
                parent_id != 1 &&
                (
                    activeData && activeData.children && activeData.children.length ||
                    !activeData ||
                    !activeData.children
                )
            ) {
                return
            }
            return new Promise((resolve, reject) => {
                let _options = {
                    url: this.URL,
                    data: {
                        parent_id
                    },
                    cacheKey: this.URL + parent_id,
                    cacheTTL : 60 * 60 * 24 * 30,
                }
                /*if (parent_id == 1) {
                    Object.assign(_options, {
                        cacheKey: this.URL,
                        cacheTTL : 60 * 60 * 24 * 30,
                    })
                }*/
                this.$axios(_options)
                    .then(res => {
                        let resData = res.data.data
                        if (parent_id == 1 || this.actValue.length < this.level - 1) {
                            resData.forEach(item => {
                                item.children = []
                            })
                        }
                        if (parent_id == 1) {
                            this.data = resData
                        } else {
                            if (resData.length == 0) {
                                delete activeData.children
                            } else {
                                activeData.children = resData
                            }
                        }
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                    })
            })
        },
        reset() {
            this.actValue = []
        }
    },
}
</script>

<style scoped>

</style>
