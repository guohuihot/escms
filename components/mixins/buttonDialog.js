// import a from '@/components/a'
import extend from 'extend'
import categories from '@/components/mixins/categories'
export default {
    components: {
    },
    mixins: [categories],
    props: {
        alert: {
            type: String,
            default: '',
        },
        method: {
            type: String,
            default: 'post',
        },
        width: {
            type: Number,
            default: 520
        },
        labelWidth: {
            type: [
                Number,
                String
            ],
            default: 90
        },
        formItems: {
            type: Array,
            default() {
                return []
            }
        },
        buttons: {
            type: Array,
            default() {
                return []
            }
        },
        ajaxBefore: {
            type: Function,
            default() {
                return true
            }
        },
        clickBefore: {
            type: Function,
            default() {
                return true
            }
        },
        url: {
            type: String,
            default: ''
        },
        // 注：不要传formItems里已经设置的值
        params: {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            dialogVisible: false,
            defaultData: {},
            buttonsItems: [
                {
                    type: 'primary',
                    title: '确 定'
                },
                {
                    type: '',
                    title: '取 消'
                }
            ],
            rules: {
                required: true,
                message: '必选'
            },
            loading: false
        }
    },
    computed: {
        hasAlert() {
            return this.alert || this.$slots.alert
        }
    },
    watch: {
        formItems: {
            handler(val) {
                val.forEach((item) => {
                    //赋初始值, 0 也可以赋值
                    // 一定要赋值，否则监控不到，影响表单验证
                    // if (item.value != undefined) {
                    this.$set(this.data, item.name, item.value)
                    if (item.type == 'select') {
                        item.options = item.options || {}
                        if (!item.options.multiple) {
                            this.categories[item.name] = { data: [] }
                        }
                    }
                    if ([
                        'radio',
                        'checkbox'
                    ].includes(item.type)) {
                        this.categories[item.name] = { data: [] }
                    }
                    if (item.type == 'editor') {
                        this.editor[item.name] = 1
                    }

                    if (item.children) {
                        item.children.forEach((item1) => {
                            //赋初始值, 0 也可以赋值
                            // 一定要赋值，否则监控不到，影响表单验证
                            // if (item.value != undefined) {
                            this.$set(this.data, item1.name, item1.value)
                            if (item1.type == 'select') {
                                item1.options = item1.options || {}
                                if (!item1.options.multiple) {
                                    this.categories[item1.name] = { data: [] }
                                }
                            }
                            if ([
                                'radio',
                                'checkbox'
                            ].includes(item1.type)) {
                                this.categories[item1.name] = { data: [] }
                            }
                            if (item1.type == 'editor') {
                                this.editor[item1.name] = 1
                            }
                        })
                    }
                })
            },
            immediate: true
        }
    },
    created() {
        // 保存默认数据
        this.defaultData = { ...this.data }
        // 处理button项
        extend(true, this.buttonsItems, this.buttons)
    },
    methods: {
        // 这个随后删除
        handleDialogShow() {
            if (this.clickBefore()) {
                this.dialogVisible = true
                Object.assign(this.data, this.params)
            }
        },

        /*handleDialogShow() {
            if (this.clickBefore()) {
                this.dialogVisible = true
                // 只接收表单里有的数据
                Object.keys(this.data).forEach(key => {
                    let val = this.params[key] != undefined ? this.params[key] : this.data[key]
                    this.data[key] = val
                });
            }
        },*/
        _ajaxBefore(data) {
            return this.ajaxBefore(data)
        },
        ajaxPost() {
            if (this.id) {
                this.data.id = this.id
            }
            // Object.assign(this.data, this.params)
            if (this._ajaxBefore(this.data)) {
                let method = this.data.id ? 'put' : 'post'
                this.loading = true
                this.$axios({
                    url: this.url,
                    method,
                    data: this.data
                }).then((res) => {
                    this.dialogVisible = false

                    res._data = this.data
                    // 还原默认数据
                    if (this.defaultData) {
                        this.data = { ...this.defaultData }
                    }

                    // 兼容
                    this.$emit('ajaxThen', res)
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            }
        },
        handleSubmit(form) {
            if (this.$refs[form]) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.ajaxPost()
                    }
                    // this.switchRules(true)
                })
            } else {
                this.ajaxPost()
            }
        },
        open() {
            this.$emit('open')
        },
        getItemData(item) {
            return (item.data ? item : this.categories[item.name]) || { data: [] }
        }
    },
}
