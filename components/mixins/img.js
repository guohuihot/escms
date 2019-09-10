export default {
    props: {
        thumb: {
            type: Boolean
        }
    },
    data () {
        return {}
    },
    computed : {
        imgHost () {
            let {
                img_host
            } = this.$store.state.config.env
            return img_host
        },
        uploadChunksUrl () {
            return `${this.imgHost}/api/file/uploadChunks`
        }
    },
    methods: {
        //图片上传地址
        getUploadImgUrl(key, water = 1) {
            return `${this.imgHost}/api/img/upload?key=${key}&status=1&water=${water}`
        },
        //图片ｕｒｌ
        getImgUrl(src, thumb = 0) {
            let {
                img_host,
                host
            } = this.$store.state.config.env
            let ret = src
            if (src.indexOf('data:') === 0 || src.indexOf('http') == 0) {
                ret = src
            } else if (src.indexOf('/') > -1 || src.indexOf('.') > 0) {
                ret = host + src
            } else {
                let sParams = ''
                // 是否启用缩略图
                if (this.thumb || thumb) {
                    sParams = '&thumb=1'
                }
                ret =  `${img_host}/api/img/show?id=${src}${sParams}`
            }
            return ret
        },
        getFileInfo (ids, callback) {
            this.$axios({ url: 'FILE_INFO', params:{ id: ids } }).then(callback)
        },
        getFileShow(id) {
            return `${this.imgHost}/api/file/show?id=${id}`
        }
    }
}
