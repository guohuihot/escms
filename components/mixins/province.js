
export default {
    name: 'province',
    data() {
        return {
            // 当前省列表
            provinces: [],
        }
    },
    methods: {
        getProvince() {
            return new Promise((resolve) => {
                this.$axios({
                    url: 'GET_PROVINCE',
                    message: false,
                    cacheKey: 'manager_province1'
                }).then((res) => {
                    res.data.forEach((item) => {
                        item.children = []
                        // 小坑
                        item.code *= 1
                        this.provinces && this.provinces.push(item)
                    })
                    resolve(res.data)
                }).catch(error => {
                    this.$message({
                        message: error || '请求省失败!',
                        type: 'error',
                        duration: 2000
                    })
                })
            })
        },
        /**
         * 获取某一级的数据
         * @param  {Number} code  地区id
         * @param  {Number} level 当前id所在的层级
         * @return {Promise}
         */
        _getAreaData(code, level) {
            const urls = [
                'GET_CITY',
                'GET_REGION',
                'GET_STREET',
            ]
            return new Promise((resolve) => {
                if (this.cancel) {
                    this.cancel()
                }
                ajax({
                    url: urls[level],
                    message: false,
                    params: {
                        code
                    },
                    cancelFn: cancel => this.cancel = cancel
                }).then(res => {
                    res.data.forEach(item => {
                        // 字符串转数字
                        item.code *= 1
                    })
                    resolve(res.data)
                })
            })
        }
    },
}
