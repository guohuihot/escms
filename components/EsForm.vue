<template>
    <el-form
        ref="form"
        :model="data"
        :label-width="labelWidth + 'px'"
        class="form"
    >
        <slot
            name="prepend"
            :data="data"
        />
        <el-form-item
            v-for="(item, i) in formItems"
            v-if="item.show ? item.show(data) : true"
            :key="i"
            :prop="item.name"
            :rules="item.rules || (i == 0 ? rules : null)"
            :label="item.label"
            :label-width="!Array.isArray(item) ? labelWidth + 'px' : '0'"
            :class="'form-item-'+item.type"
        >
            <el-radio-group
                v-if="item.type == 'radio' && (item.data || categories[item.name].data)"
                v-model="data[item.name]"
            >
                <el-radio
                    v-for="item1 in (item.data || categories[item.name].data)"
                    :key="item1.type_id"
                    :label="item1.type_id"
                >
                    {{ item1.type_name }}
                </el-radio>
            </el-radio-group>
            <el-checkbox-group
                v-else-if="item.type == 'checkbox' && (item.data || categories[item.name].data)"
                v-model="data[item.name]"
            >
                <el-checkbox
                    v-for="item1 in (item.data || categories[item.name].data)"
                    :key="item1.type_id"
                    :label="item1.type_id"
                >
                    {{ item1.type_name }}
                </el-checkbox>
            </el-checkbox-group>
            <el-select
                v-else-if="item.type == 'select' && (item.data || categories[item.name].data)"
                v-model="data[item.name]"
                style="width: 100%;"
                clearable
                :placeholder="item.placeholder"
            >
                <el-option
                    v-for="item1 in (item.data || categories[item.name].data)"
                    :key="item1.type_id"
                    :value="item1.type_id"
                    :label="item1.type_name "
                />
            </el-select>
            <es-upload-img
                v-else-if="item.type == 'image'"
                v-model="data[item.name]"
                :name="item.name"
                :multiple="item.multiple"
                :placeholder="item.placeholder"
                @change="handleUploadChange"
            />
            <!-- <el-input v-else-if="item.type == 'hidden'"
            type="hidden" v-model="data[item.name]" :value="item.value"
            ></el-input> -->
            <es-date-picker
                v-else-if="item.type == 'date'"
                v-model="data[item.name]"
                style="width: 100%;"
                :style="item.style"
                :type="item.dateType"
                :value-format="item.valueFormat"
                :placeholder="item.placeholder"
            />
            <el-input
                v-else-if="item.type == 'textarea'"
                v-model.trim="data[item.name]"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 20 }"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
            />
            <el-row
                v-else-if="Array.isArray(item)"
                :gutter="0"
            >
                <el-col
                    v-for="(it, j) in item"
                    v-if="it.show ? it.show(data) : true"
                    :key="j"
                    :span="it.span"
                >
                    <el-form-item
                        :prop="it.name"
                        :rules="it.rules || (i == 0 ? rules : null)"
                        :label="it.label"
                        :label-width="it.labelWidth ? it.labelWidth + 'px' : ''"
                        :class="'form-item1-'+it.type"
                    >
                        <el-select
                            v-if="it.type == 'select' && (it.data || categories[it.name].data)"
                            v-model="data[it.name]"
                            style="width: 100%;"
                            clearable
                            :placeholder="it.placeholder"
                        >
                            <el-option
                                v-for="it1 in (it.data || categories[it.name].data)"
                                :key="it1.type_id"
                                :value="it1.type_id"
                                :label="it1.type_name "
                            />
                        </el-select>
                        <es-date-picker
                            v-else-if="it.type == 'date'"
                            v-model="data[it.name]"
                            style="width: 100%;"
                            :style="it.style"
                            :type="it.dateType"
                            :value-format="it.valueFormat"
                            :placeholder="it.placeholder"
                        />
                        <el-input
                            v-else
                            v-model.trim="data[it.name]"
                            :type="it.type || 'text'"
                            :style="it.style"
                            :placeholder="it.placeholder"
                        >
                            <template
                                v-if="it.suffix"
                                slot="suffix"
                            >
                                {{ it.suffix }}
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-input
                v-else
                v-model.trim="data[item.name]"
                :type="item.type || 'text'"
                :style="item.style"
                :placeholder="item.placeholder"
            >
                <template
                    v-if="item.suffix"
                    slot="suffix"
                >
                    {{ item.suffix }}
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                :disabled="buttonDisabled"
                :loading="loading"
                @click="handleSubmit('form')"
            >
                确定提交
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>

import EsUploadImg  from '@/components/EsUploadImg'
import EsDatePicker from '@/components/EsDatePicker'

export default {
    components: {
        EsUploadImg,
        EsDatePicker
    },
    mixins: [],
    props: {
        url: {
            type: [String],
            default: ''
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
        data: {
            type: Object,
            default() {
                return {}
            }
        },
        submitBefore: {
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
        buttonDisabled: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            rules: [],
            loading: false
        }
    },
    computed: {
    },
    watch: {

    },
    methods: {
        handleUploadChange(imgData) {
            Object.keys(imgData).forEach((k) => {
                this.$set(this.data, k, imgData[k])
            })
            // Object.assign(this.data, { ...imgData })
        },
        ajaxPost() {
            if (this.id) {
                this.data.id = this.id
            }
            // Object.assign(this.data, this.params)
            if (
                this.submitBefore(this.data) &&
                (!this.ajaxBefore || this.ajaxBefore() != false)
            ) {
                this.loading = true
                this.$axios({
                    url: this.url,
                    method: 'post',
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
    },
}
</script>

<style scoped>
</style>
