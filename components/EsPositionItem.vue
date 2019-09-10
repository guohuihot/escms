<template>
    <es-dl-layout
        :label="label"
        style="line-height: 2.4;"
        :max-width="width == '100%' ? 2000 : 520"
    >
        <el-cascader
            v-model="actValue"
            :disabled="disabled"
            :style="`width: ${cwidth}`"
            :size="size"
            :class="{'search-item-active': actValue && actValue.length}"
            clearable
            separator="-"
            :options="provinces"
            :props="positionProps"
            change-on-select
            @change="positionChange"
        />
    </es-dl-layout>
</template>

<script>
import EsDlLayout from '@/components/EsDlLayout'

import province from '@/components/mixins/province'

export default {
    name: 'EsPositionItem',
    components: {
        EsDlLayout
    },
    filters: {
    },
    mixins: [province],
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        // 允许的级别，从1开始
        level: {
            type: Number,
            default: 2
        },
        value: {
            type: Array,
            default: () => []
        },
        label: {
            type: String,
            default: ''
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
        // 负责的城市，除此外，其它锁定
        cities: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            positionProps: {
                label: 'name',
                value: 'code'
            },
            // 当前选中的code
            actValue: [],
            // 当前省列表
            provinces: [],
        }
    },
    computed: {
        cwidth() {
            return (this.width == '100%' || this.label) ? '100%' : `${this.width}px`
        },
        // 当前值对应的当前项
        // 选中的tree => [{name: '一级'}, {name: '二级'}, {name: '三级'}]，组件默认只给出了对应的code,故另外保存起来
        activeItems() {
            let aItem = []
            let { value } = this
            let getItem = function(items, level = 0) {
                items.forEach((item, i) => {
                    if (item.code == value[level]) {
                        aItem.push(item)
                        item.children && getItem(item.children, ++level)
                    }
                })
            }
            // 从当前省列表开始
            getItem(this.provinces)
            return aItem
        },
        activeItemNames() {
            let oPositions = {
                province: '',
                city: '',
                region: '',
                street: ''
            }
            Object.keys(oPositions).forEach((name, i) => {
                if (this.activeItems[i]) {
                    oPositions[name] = this.activeItems[i].name
                }
            })
            return oPositions
        }
    },
    watch: {
        // 默认值
        value: {
            handler: async function(val, oldVal = []) {
                let i = 0
                // 优化性能，从不同项开始请求，已请求的不再请求, val = [1, 2, 3] oldVal = [1, 2, 3, 4] 从4开始
                for (let j = 0; j < val.length; j++) {
                    i = j
                    if (val[j] !== oldVal[j]) {
                        break
                    }
                }
                for (i; i < val.length; i++) {
                    let cval = [...val]
                    let codes = cval.splice(0, i + 1)
                    await this.positionChange(codes)
                }
                this.actValue = val
            },
            immediate: true
        },
        actValue(val) {
            this.$emit('input', this.actValue)
        }
    },
    created() {
        this.getProvince()
            .then(() => {
                this.lock()
            })
    },
    methods: {
        // 只显示负责的城市
        lock() {
            if (this.cities.length) {
                // 根据城市取省
                let _provinces = this.cities.map(city => {
                    return Number(`${String(city).substr(0, 2)}0000`)
                })
                // 过滤其它
                this.provinces = this.provinces.filter(item => _provinces.includes(item.code))
            }
        },
        // 联动，值改变时的方法
        positionChange: async function(codes) {
            let level1 = codes.length
            // 抛出change
            if (!level1) {
                // 清空时做下延时保存搜索时字段
                setTimeout(() => {
                    this.$emit('change', codes, this.activeItems, this.activeItemNames)
                }, 0)
            } else {
                this.$emit('change', codes, this.activeItems, this.activeItemNames)
            }
            // 最后一级点击时不再请求
            if (level1 >= this.level || !level1) {
                return
            }
            let code = codes[level1 - 1]
            let areaData = await this._getAreaData(code, level1 - 1)
            // 只显示限制的区域
            if (level1 == 1 && this.cities.length) {
                areaData = areaData.filter(item => this.cities.includes(item.code))
            }
            // 最后一级上不显示箭头
            if (level1 < this.level - 1) {
                areaData.forEach(item => {
                    item.children = []
                })
            }
            // 当前项的父级
            let activeParent = this.activeItems[level1 - 1] || {}
            activeParent.children = areaData.length ? areaData : [{ name: '无', disabled: true }]
        },
        /*reset() {
            this.actValue = []
        }*/
    },
}
</script>

<style scoped>

</style>
