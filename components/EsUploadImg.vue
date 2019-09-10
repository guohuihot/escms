<template>
    <el-form-item
        :prop="name || prop"
        class="upload"
        :rules="rules"
        :required="required"
        :class="{multiple: multiple}"
    >
        <div
            v-for="(item, i) in readOnlyData"
            :key="i"
            class="upload-item"
        >
            <div class="el-upload el-upload--picture-card">
                <cxe-img
                    width="100%"
                    height="100%"
                    :src="item.url"
                />
                <div class="tac">
                    {{ item.label }}
                </div>
            </div>
        </div>
        <div
            v-for="(item, i) in imageUrl"
            v-if="multiple"
            :key="i"
            class="upload-item"
        >
            <div class="el-upload el-upload--picture-card">
                <cxe-img
                    width="100%"
                    height="100%"
                    :src="item.url"
                />
                <i
                    class="el-icon-error el-icon-errorx"
                    @click.stop="handleRemove(i, item.url)"
                />
            </div>
            <div class="tac">
                <!-- <span class="text-danger" v-if="required">*</span> -->
                {{ item.label }}
            </div>
            <div class="el-form-item__error">
&nbsp;
            </div>
        </div>
        <el-upload
            ref="upload"
            :action="uploadURL"
            class="img-list"
            list-type="picture-card"
            :show-file-list="false"
            :disabled="disabled"
            :multiple="multiple"
            :required="required"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
        >
            <es-img
                v-if="isSingle"
                width="100%"
                height="100%"
                :src="imageUrl[0].url"
            />
            <i
                v-if="isSingle"
                class="el-icon-error el-icon-errorx"
                @click.stop="handleRemove(0,imageUrl[0].url)"
            />
            <!-- <el-progress type="circle" :percentage="50"></el-progress> -->
            <i
                v-if="!isSingle"
                class="el-icon-plus el-icon-plusx"
            />
        </el-upload>
        <div
            v-if="!multiple"
            class="tac"
        >
            <span
                v-if="required"
                class="text-danger"
            >*</span>
            {{ label }}
        </div>
    </el-form-item>
</template>

<script>
// import * as filter from '@/util/filter'
import EsImg from '@/components/EsImg'
import img from  '@/components/mixins/img'

export default {
    name: 'UploadImg',
    components: {
        EsImg
    },
    mixins:[img],
    props: {
        label: String,
        prop: String,
        name: String,
        multiple: Boolean,
        format: String,
        disabled: Boolean,
        rules: {},
        value: {},
        required: Boolean,
        limit: {
            type: Number,
            default: 20
        },
        readOnlyData:{
            type: [
                Array,
                Object
            ],
            default: () => { return [] }
        },
        //是否使用水印
        water : {
            type:Boolean,
            default: true
        },
        type: {
            type:String,
            default:'img_park_file'
        }
    },
    data() {
        //let self = this
        //let { img_host } = this.$store.state.config.env

        return {
            // 上传地址
            //UPLOAD_URL: img_host + '/api/img/upload?key=img_park_file',
            imageUrl: [],
            fileList: [],
        }
    },
    computed: {
        isSingle() {
            return !this.multiple && this.imageUrl[0] && this.imageUrl[0].url
        },
        uploadURL () {
            return this.getUploadImgUrl(this.type, this.water ? 1 : 0)
        }
    },
    watch: {
        value: {
            handler: 'transformUrl',
            immediate: true
        },
    },
    created() {
        // this.imageUrl = this.value
    },
    methods: {
        getValue(val) {
            let _val = val
            // 兼容对象
            if (this.format == 'object' && typeof val == 'object') {
                // url不存在表示空对象不处理
                if (val.url) {
                    _val.label = _val.label || this.label
                }
            } else if (val) {
                _val = { name: this.name, label: this.label, url: val }
            }
            return _val
        },
        transformUrl(val, oldVal) {
            let imageUrl
            // 处理空值
            if (this.multiple && !val) {
                val = []
            }
            if (this.multiple) {
                imageUrl = []
                val.forEach(url => {
                    url && imageUrl.push(this.getValue(url))
                })
            } else {
                imageUrl = [this.getValue(val)]
            }
            this.imageUrl = imageUrl
        },
        handleBeforeUpload(file) {
            if (this.multiple && this.value && this.value.length >= this.limit) {
                this.$message({
                    message: `最多上传${this.limit}个文件！`,
                    type: 'warning'
                })
                return false
            }
            return true
        },
        handleSuccess({ msg }, file, fileList) {
            let val
            if (this.multiple) {
                let _value = this.value || []
                // 追加
                if (_value.length < this.limit) {
                    val = [
                        ...(_value || []),
                        (
                            this.format == 'object'
                                ? this.getValue(msg)
                                : msg
                        )
                    ]
                } else {
                    val = _value
                }
            } else {
                val = this.format == 'object'
                    ? this.getValue(msg)
                    : msg
            }
            this.$emit('change', { [this.name]: val })
        },
        handleRemove(i, id) {
            let val
            if (this.multiple) {
                val = [...this.value]
                val.splice(i, 1)
            } else {
                val = ''
            }
            this.$axios({
                url: 'FILE_DELETE',
                data:{ id },
                method:'post'
            }).then(() => {

            })
            this.$emit('change', { [this.name]: val })
        }
    },
}
</script>

<style scoped>
.upload {
    float: left;
    margin-right: 20px;
    width: 110px;
    position: relative;
    z-index: 10;
    &.multiple {
        z-index: 9;
        float: none;
        width: auto;
    }
    &-item {
        margin-right: 20px;
        float: left;
        .el-upload {
            overflow: hidden;
            position: relative;
            img {
                vertical-align: top;
            }
        }
    }
}

.el-icon-error {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 16px;
    color: #eee;
}
</style>
