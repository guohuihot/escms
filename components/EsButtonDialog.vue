<template>
    <span v-if="isShow">
        <el-button
            :type="type"
            :size="size"
            :plain="plain"
            :round="round"
            :disabled="disabled"
            :style="btnStyle"
            @click="handleDialogShow"
        ><slot>{{ title }}</slot></el-button>

        <el-dialog
            v-if="dialogVisible"
            class="dialog"
            :title="title"
            :visible.sync="dialogVisible"
            :width="width + 'px'"
            :append-to-body="true"
            @open="open"
        >
            <el-alert
                v-if="hasAlert"
                :title="alert"
                class="dialog-alert"
                type="warning"
            >
                <slot name="alert" />
            </el-alert>
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
                <el-tabs
                    v-model="activeName"
                    type="card"
                >
                    <el-tab-pane
                        v-for="(tab, j) in formItems"
                        :key="j"
                        :label="tab.label"
                        :name="tab.name"
                    >
                        <el-form-item
                            v-for="(item, i) in tab.children"
                            v-if="item.show ? item.show(data) : true"
                            :key="i"
                            :prop="item.name"
                            :rules="item.rules || ((i == 0 && j == 0) ? rules : null)"
                            :label="item.label"
                            :label-width="!Array.isArray(item) ? labelWidth + 'px' : '0'"
                            :class="'form-item-'+item.type"
                        >
                            <el-radio-group
                                v-if="item.type == 'radio' && getItemData(item).data"
                                v-model="data[item.name]"
                            >
                                <el-radio
                                    v-for="item1 in getItemData(item).data"
                                    :key="item1.type_id"
                                    :label="item1.type_id"
                                >
                                    {{ item1.type_name }}
                                </el-radio>
                            </el-radio-group>
                            <el-checkbox-group
                                v-else-if="item.type == 'checkbox' && getItemData(item).data"
                                v-model="data[item.name]"
                            >
                                <el-checkbox
                                    v-for="item1 in getItemData(item).data"
                                    :key="item1.type_id"
                                    :label="item1.type_id"
                                >
                                    {{ item1.type_name }}
                                </el-checkbox>
                            </el-checkbox-group>
                            <es-select
                                v-else-if="item.type == 'select' && ((item.options && item.options.remote) || getItemData(item).data)"
                                v-model="data[item.name]"
                                style="width: 100%;"
                                clearable
                                :data="params[item.options.dataKey] || getItemData(item).data"
                                :placeholder="item.placeholder"
                                v-bind="item.options"
                            />
                            <es-upload-img
                                v-else-if="item.type == 'image'"
                                v-model="data[item.name]"
                                :name="item.name"
                                :multiple="item.multiple"
                                :placeholder="item.placeholder"
                                @change="handleUploadChange"
                            />
                            <!-- <es-map-picker
                                v-else-if="item.type == 'map'"
                                v-model="data[item.name]"
                            /> -->
                            <es-date-picker
                                v-else-if="item.type == 'date'"
                                v-model="data[item.name]"
                                style="width: 100%;"
                                :style="item.style"
                                :type="item.dateType"
                                :value-format="item.valueFormat"
                                :placeholder="item.placeholder"
                            />
                            <es-form-tags
                                v-else-if="item.type == 'tags'"
                                v-model="data[item.name]"
                            />
                            <el-input
                                v-else-if="item.type == 'textarea'"
                                v-model.trim="data[item.name]"
                                type="textarea"
                                :autosize="{ minRows: 5, maxRows: 20 }"
                                :disabled="item.disabled"
                                :placeholder="item.placeholder"
                            />
                            <es-position-item
                                v-else-if="item.type == 'position'"
                                width="100%"
                                :style="item.style"
                                :default-value="item.value"
                                @change="handlePosition"
                            />
                            <es-cascader
                                v-else-if="item.type == 'tree'"
                                v-model="data[item.name]"
                                width="100%"
                                v-bind="item.options"
                            />

                            <es-editor
                                v-else-if="item.type == 'editor'"
                                @updateFloating="handleUpdateFloating"
                                @unsetFloating="handleUnsetFloating"
                                @ready="ed => handleEditorReady(ed, item.name)"
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
                                            v-if="it.type == 'select' && it.data"
                                            v-model="data[it.name]"
                                            style="width: 100%;"
                                            clearable
                                            :placeholder="it.placeholder"
                                        >
                                            <el-option
                                                v-for="it1 in it.data"
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
                                            >{{ it.suffix }}</template>
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
                                >{{ item.suffix }}</template>
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
                <slot
                    name="other"
                    :dialog-visible="dialogVisible"
                />
            </el-form>
            <slot
                slot="footer"
                name="footer"
            >
                <div
                    slot="footer"
                    class="dialog-footer tac"
                >
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

import button         from '@/components/mixins/button'
import buttonDialog   from '@/components/mixins/buttonDialog'
import EsCascader     from '@/components/EsCascader'
import EsDatePicker   from '@/components/EsDatePicker'
import EsFormTags     from '@/components/EsFormTags'
// import EsMapPicker    from '@/components/EsMapPicker'
import EsPositionItem from '@/components/EsPositionItem'
import EsSelect       from '@/components/EsSelect'
import EsUploadImg    from '@/components/EsUploadImg'
// editor
import EsEditor from '@/components/EsEditor'

export default {
    name: 'EsButtonDialog',
    components: {
        EsCascader,
        EsDatePicker,
        EsEditor,
        EsFormTags,
        // EsMapPicker,
        EsPositionItem,
        EsSelect,
        EsUploadImg,
    },
    mixins: [
        button,
        buttonDialog
    ],
    props: {
        id: {
            type: [
                String,
                Number,
                Array
            ],
            default: ''
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
    methods: {
        handleUploadChange(imgData) {
            Object.keys(imgData).forEach((k) => {
                this.$set(this.data, k, imgData[k])
            })
            // Object.assign(this.data, { ...imgData })
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
