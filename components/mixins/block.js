// 列表通用的块转换代码
import categories    from '@/components/mixins/categories'
import unit          from '@/components/mixins/unit'
import { _template } from '@/util/utils'

export default {
    components: {
    },
    mixins: [categories, unit],
    filters: {
    },
    props: {
    },
    data() {
        return {
        }
    },
    computed: {
        // 兼容三种为列的方式
        /*newTableColumns() {
            return this.tableColumns || this.rows || this.items
        }*/
    },
    watch: {

    },
    created() {
        // 调用分类
        /*this.newTableColumns.forEach(({ ftype = {}, prop }) => {
            if (ftype.type == 'fieldTitle' || ftype == 'fieldTitle') {
                this.categories[ftype.alias || prop] = {}
            }
        })

        // 重新调用
        this.getCategories()*/
    },
    methods: {
        getPropValue(data, prop) {
            let value
            if (prop.indexOf('.') > 0) {
                // 支持.取值
                let aProp = prop.split('.')
                value = data[aProp[0]] ? data[aProp[0]][aProp[1]] : ''
            } else {
                value = data[prop]
            }
            return value
        },
        getValue(value, { prop, ftype = {} }, data) {
            value = this.getPropValue(data, prop)
            if (value || value == 0) {
                if (typeof ftype == 'function') {
                    value = ftype(data, (...arg) => {
                        // return this.fieldTitle(val || data[prop], this.categories[alias || prop], '，', prop)
                        return this.fieldTitle1(
                            typeof arg[0] == 'object'
                                ? Object.assign(arg[0], {
                                    value: arg[0].value || data[arg[0]],
                                })
                                : {
                                    prop: arg[0],
                                    alias: arg[1],
                                    value: arg[2] || data[arg[0]]
                                }
                        )
                    })
                } else if (ftype.type == 'fieldTitle' || ftype == 'fieldTitle') {
                    // value = this.fieldTitle(value, ftype.data ? ftype : this.categories[ftype.alias || prop], '，', prop)
                    value = this.fieldTitle1({
                        value,
                        prop,
                        alias: ftype.alias,
                        nData: ftype.data,
                    })
                } else if (ftype.template) {
                    value = _template(ftype.template, data, '---')
                } else if (this.$options.filters[ftype]) {
                    value = this.$options.filters[ftype](value)
                } else if (this.$options.filters[ftype.type]) {
                    let { type, argument = [] } = ftype
                    value = this.$options.filters[type](value, ...argument)
                }
            }

            return value
        }
    },
}
