<template>
    <span v-if="isShow">
        <el-button
            :type="type"
            :size="size"
            :plain="plain"
            :round="round"
            :disabled="disabled"
            :style="btnStyle"
            @click="handleDialogShow"><slot>{{ title }}</slot></el-button>

        <el-dialog
            v-if="dialogVisible"
            class="dialog"
            :title="title"
            :visible.sync="dialogVisible"
            :width="width + 'px'"
            :append-to-body="true"
            @open="open">
            <el-alert
                v-if="hasAlert"
                :title="alert"
                class="dialog-alert"
                type="warning">
                <slot name="alert"></slot>
            </el-alert>
            <el-form
                ref="form"
                :model="data"
                :label-width="labelWidth + 'px'"
                class="form">
                <slot name="prepend" :data="data"></slot>
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane
                        :label="tab.label"
                        :name="tab.name"
                        v-for="(tab, j) in formItems"
                        :key="j"
                    >
                        <el-form-item
                            v-if="item.show ? item.show(data) : true"
                            v-for="(item, i) in tab.children"
                            :key="i"
                            :prop="item.name"
                            :rules="item.rules || ((i == 0 && j == 0) ? rules : null)"
                            :label="item.label"
                            :label-width="!Array.isArray(item) ? labelWidth + 'px' : '0'"
                            :class="'form-item-'+item.type">
                            <el-radio-group
                                v-if="item.type == 'radio' && getItemData(item).data"
                                v-model="data[item.name]">
                                <el-radio
                                    v-for="item1 in getItemData(item).data"
                                    v-if="filterData(item,item1)"
                                    :key="item1.type_id"
                                    :label="item1.type_id">
                                    {{ item1.type_name }}
                                </el-radio>
                            </el-radio-group>
                            <el-checkbox-group
                                v-else-if="item.type == 'checkbox' && getItemData(item).data"
                                v-model="data[item.name]">
                                <el-checkbox
                                    v-for="item1 in getItemData(item).data"
                                    v-if="filterData(item,item1)"
                                    :key="item1.type_id"
                                    :label="item1.type_id">
                                    {{ item1.type_name }}
                                </el-checkbox>
                            </el-checkbox-group>
                            <ys-select
                                v-else-if="item.type == 'select' && ((item.options && item.options.remote) || getItemData(item).data)"
                                style="width: 100%;"
                                clearable
                                v-model="data[item.name]"
                                :data="params[item.options.dataKey] || getItemData(item).data"
                                :placeholder="item.placeholder"
                                v-bind="item.options"
                                >
                            </ys-select>
                            <upload-img
                                v-else-if="item.type == 'image'"
                                v-model="data[item.name]"
                                :name="item.name"
                                :multiple="item.multiple"
                                :placeholder="item.placeholder"
                                @change="handleUploadChange">
                            </upload-img>
                            <map-picker
                                v-else-if="item.type == 'map'"
                                v-model="data[item.name]"
                            >
                            </map-picker>
                            <ys-date-picker
                                v-else-if="item.type == 'date'"
                                v-model="data[item.name]"
                                style="width: 100%;"
                                :style="item.style"
                                :type="item.dateType"
                                :value-format="item.valueFormat"
                                :placeholder="item.placeholder"></ys-date-picker>
                            <ys-form-tags
                                v-else-if="item.type == 'tags'"
                                v-model="data[item.name]"
                            >
                            </ys-form-tags>
                            <el-input
                                v-else-if="item.type == 'textarea'"
                                type="textarea"
                                :autosize="{ minRows: 5, maxRows: 20 }"
                                v-model.trim="data[item.name]"
                                :disabled="item.disabled"
                                :placeholder="item.placeholder"></el-input>
                            <position-item
                                v-else-if="item.type == 'position'"
                                width="100%"
                                :style="item.style"
                                :default-value="item.value"
                                @change="handlePosition"
                                >
                            </position-item>
                            <cascader
                                v-else-if="item.type == 'tree'"
                                v-model="data[item.name]"
                                width="100%"
                                v-bind="item.options"
                            >
                            </cascader>

                            <ys-editor
                                v-else-if="item.type == 'editor'"
                                @updateFloating="handleUpdateFloating"
                                @unsetFloating="handleUnsetFloating"
                                @ready="ed => handleEditorReady(ed, item.name)">
                            </ys-editor>
                            <el-row :gutter="0" v-else-if="Array.isArray(item)">
                                <el-col :span="it.span" :key="j" v-for="(it, j) in item" v-if="it.show ? it.show(data) : true">
                                    <el-form-item
                                        :prop="it.name"
                                        :rules="it.rules || (i == 0 ? rules : null)"
                                        :label="it.label"
                                        :label-width="it.labelWidth ? it.labelWidth + 'px' : ''"
                                        :class="'form-item1-'+it.type">
                                        <el-select
                                            v-if="it.type == 'select' && it.data"
                                            style="width: 100%;"
                                            clearable
                                            v-model="data[it.name]"
                                            :placeholder="it.placeholder">
                                            <el-option
                                                v-for="it1 in it.data"
                                                v-if="filterData(it, it1)"
                                                :key="it1.type_id"
                                                :value="it1.type_id"
                                                :label="it1.type_name ">
                                            </el-option>
                                        </el-select>
                                        <ys-date-picker
                                            v-else-if="it.type == 'date'"
                                            v-model="data[it.name]"
                                            style="width: 100%;"
                                            :style="it.style"
                                            :type="it.dateType"
                                            :value-format="it.valueFormat"
                                            :placeholder="it.placeholder"></ys-date-picker>
                                        <el-input
                                            v-else
                                            :type="it.type || 'text'"
                                            :style="it.style"
                                            v-model.trim="data[it.name]"
                                            :placeholder="it.placeholder">
                                            <template v-if="it.suffix" slot="suffix">{{ it.suffix }}</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-input
                                v-else
                                :type="item.type || 'text'"
                                :style="item.style"
                                v-model.trim="data[item.name]"
                                :placeholder="item.placeholder">
                                <template v-if="item.suffix" slot="suffix">{{ item.suffix }}</template>
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
                <slot name="other" :dialog-visible="dialogVisible"></slot>
            </el-form>
            <slot slot="footer" name="footer">
                <div slot="footer" class="dialog-footer tac">
                    <el-button
                        :type="buttonsItems[1].type"
                        @click="dialogVisible = false"
                    >
                        {{ buttonsItems[1].title }}
                    </el-button>
                    <el-button
                        :type="buttonsItems[0].type"
                        :disabled="buttonsItems[0].disabled"
                        :loading="loading"
                        @click="handleSubmit('form')"
                    >
                        {{ buttonsItems[0].title }}
                    </el-button>
                </div>
            </slot>
        </el-dialog>
    </span>
</template>

<script>

import button       from '@/components/mixins/button'
import buttonDialog from '@/components/mixins/buttonDialog'
import UploadImg    from '@/components/UploadImg'
import YsDatePicker from '@/components/YsDatePicker'
import YsSelect     from '@/components/YsSelect'
import PositionItem from '@/components/PositionItem'
import YsFormTags   from '@/components/YsFormTags'
import Cascader     from '@/components/Cascader'
import MapPicker    from '@/components/MapPicker'
// editor
import YsEditor from '@/components/YsEditor'

export default {
    name: 'YsButtonDialog',
    components: {
        UploadImg,
        YsDatePicker,
        YsSelect,
        PositionItem,
        YsFormTags,
        Cascader,
        MapPicker,
        YsEditor,
    },
    mixins: [button, buttonDialog],
    props: {
        id: {
            type: [String, Number, Array],
        },
    },
    data() {
        return {
            // 是否显示按钮
            isShow: true,
            activeName: 'base',
            data: {},
            editor: {}
        }
    },
    computed: {
    },
    watch: {

    },
    created() {
    },
    mounted() {
    },
    methods: {
        handleUploadChange(imgData) {
            Object.keys(imgData).forEach((k) => {
                this.$set(this.data, k, imgData[k])
            })
            // Object.assign(this.data, { ...imgData })
        },
        filterData (item, data) {
            if (typeof item.filter == 'undefined') {
                return true
            }
            return item.filter(data)
        },
        handlePosition(code, items, oPositions) {
            Object.assign(this.data, { ...oPositions })
        },
        // 编辑器ready
        handleEditorReady(editor, name) {
            this.editor[name] = editor
            this.editor[name].setContent(window.UE.utils.html(this.data[name]))
        },
        setContent(name) {
            if (window.UE) {
                this.data[name] = window.UE.utils.html(this.editor[name].getContent())
            }
        },
        handleUpdateFloating() {
            this.btnsBarStyle = {
                position: 'fixed',
                backgroundColor: '#fff',
                zIndex: 99999,
                width: '100%',
                bottom: 0,
                padding: '5px 0',
                marginBottom: 0
            }
        },
        handleUnsetFloating() {
            this.btnsBarStyle = ''
        },
        _ajaxBefore(data) {
            if (Object.keys(this.editor).length) {
                let keys = Object.keys(this.editor)
                keys.forEach(key => {
                    this.setContent(key)
                })
            }
            return this.ajaxBefore(data)
        },
    },
}
</script>

<style scoped>
.dialog {
    text-align: left;
    line-height: 32px;
    .el-radio-group {
        vertical-align: middle;
    }
    &-alert {
       margin: 0 0 10px;
       line-height: 22px;
       font-size: 12px;
       padding: 5px 16px 5px 10px;
    }
}
.form-item-hidden {
    display: none;
}
/deep/ .el-tabs__content {
    overflow: visible;
}
</style>
