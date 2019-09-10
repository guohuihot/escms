let urlOptions = {
    class_facility_id: 'FACILITIES',
    class_prices_id: 'CLASS_PRICES',
    class_types_id: 'CLASS_TYPES',
    class_sizes_id: 'CLASS_SIZES',
}

export default {
    components: {
    },
    data() {
        return {
            categories: {
            }
        }
    },
    computed: {
    },
    mounted() {
        this.getCategories()
    },
    methods: {
        async _ajax (options) {
            let _options = Object.assign({
                cacheKey: options.url,
                cacheTTL : 60 * 60 * 24 * 30,
                cacheTransform(res) {
                    res.data.data = res.data.data.map(item => {
                        return {
                            type_id: item.id,
                            type_name: item.title
                        }
                    })
                    return res
                }
            }, options)

            let _res = await this.$axios(_options)
            return _res.data.data
        },
        async getCategories() {
            for (let key in this.categories) {
                if (
                    urlOptions[key] && (
                        (this.categories[key].data && !this.categories[key].data.length) ||
                        !this.categories[key].data
                    )
                ) {
                    this.$set(this.categories[key], 'data', [])
                    let res = await this._ajax({
                        url: urlOptions[key]
                    })
                    this.categories[key].data = res
                    // this.$set(this.categories[key], 'data', res)
                }
            }
        },
        fTitle(options) {
            let {
                value,
                // data,
                sep,
                prop,
                alias
            } = Object.assign({
                value: '',
                data: [],
                sep: '/',
                prop: '',
                alias: ''
            }, options)
            prop = alias || prop
            let values = Array.isArray(value) ? value.map(v => v * 1) : [value * 1]
            let names = []
            if (!this.categories.hasOwnProperty(prop)) {
                this.$set(this.categories, prop, { data: [] })
            }
            this.categories[prop].data.forEach((item) => {
                if (values.includes(item.type_id)) {
                    names.push(item.type_name)
                }
            })

            return names.length ? names.join(sep) : '---'
        }
    }
}
