<template>
    <div
        v-loading="loading"
        style="background-color: #fff;"
    >
        <div style="margin-bottom: 10px;">
            <es-button-dialog
                :url="URL"
                title="添加顶级菜单"
                type="primary"
                size="medium"
                :params="{
                    parent_id: '0'
                }"
                :form-items="formItems"
                @ajaxThen="(res) => addMenu(res.data)"
            />
        </div>
        <el-row
            :gutter="20"
            style="background-color: #fafafa;padding: 10px 0;margin: 0;font-weight: bold;margin-bottom: 5px;"
        >
            <el-col :span="6">
                名称
            </el-col>
            <el-col :span="6">
                地址
            </el-col>
            <el-col :span="6">
                排序
            </el-col>
            <el-col
                :span="6"
                class="text-right"
            >
                操作
            </el-col>
        </el-row>
        <el-tree
            class="tree"
            node-key="id"
            :props="props"
            :data="allMenuData"
            :indent="30"
            :default-expand-all="true"
            :draggable="false"
            :expand-on-click-node="false"
            :check-on-click-node="false"
        >
            <template #default="{ node, data }">
                <el-row
                    :gutter="20"
                    style="width: 100%;"
                >
                    <el-col :span="6">
                        {{ node.label }}
                    </el-col>
                    <el-col :span="6">
                        {{ data.value || '-' }}
                    </el-col>
                    <el-col :span="6">
                        {{ data.sort || 0 }}
                    </el-col>
                    <el-col
                        :span="6"
                        class="text-right"
                    >
                        <!-- 只支持3级 -->
                        <es-button-dialog
                            v-if="node.level < 3"
                            :url="URL"
                            title="添加"
                            type="text"
                            size="medium"
                            :params="{
                                parent_id: data.id
                            }"
                            :form-items="formItems"
                            @ajaxThen="(res) => addMenu(res.data)"
                        />
                        <es-button-dialog
                            :url="URL"
                            title="修改"
                            type="text"
                            size="medium"
                            method="put"
                            :params="data"
                            :form-items="[
                                {
                                    label: '父级',
                                    name: 'parent_id',
                                    type: 'select',
                                    data: [
                                        { value: '0', label: '顶级' },
                                        ...allData.map(item => ({ value: item.id, label: item.name }))
                                    ],
                                    options: {
                                        size: 'medium'
                                    }
                                },
                                ...formItems
                            ]"
                            @ajaxThen="(res) => updateMenu(res.data)"
                        />

                        <es-button-ajax
                            v-if="!data.no_delete"
                            :id="data.id"
                            :url="URL"
                            title="删除"
                            class="text-danger"
                            type="text"
                            size="medium"
                            method="delete"
                            @ajaxThen="() => deleteMenu(data)"
                        />
                    </el-col>
                </el-row>
            </template>
        </el-tree>
    </div>
</template>
<script>
import EsButtonDialog                           from '@/components/EsButtonDialog'
import EsButtonAjax                             from '@/components/EsButtonAjax'
// import { localStorageRemoveItem }            from '@/util/utils'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        EsButtonDialog,
        EsButtonAjax,
    },
    mixins: [],
    data() {
        return {
            title: '区域',
            URL: '/api/menu',
            props: {
                label: 'name',
                children: 'children',
                isLeaf: 'leaf'
            },

            formItems: [
                {
                    label: '标题',
                    name: 'name',
                    rules: {
                        required: true,
                        message: '标题必填'
                    }
                },
                {
                    label: 'URL',
                    name: 'value',
                    rules: {
                        required: true,
                        message: 'URL必填'
                    }
                },
                {
                    label: '别名',
                    name: 'slug',
                },
                {
                    label: '图标',
                    name: 'icon',
                },
                {
                    label: '排序',
                    name: 'sort',
                }
            ],
            // defaultExpandedKeys: [],
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            allMenuData: 'menu/allMenuData',
            allData: 'menu/data',
        })
    },
    methods: {
        ...mapMutations({
            addMenu: 'menu/addMenu',
            updateMenu: 'menu/updateMenu',
            deleteMenu: 'menu/deleteMenu',
        }),
    }
}
</script>
<style scoped lang="scss">
.tree /deep/ {
    .el-tree-node__content {
        height: auto;
        line-height: 44px;
        font-size: 14px;
    }
    .el-checkbox__input.is-disabled .el-checkbox__inner {
        visibility: hidden;
        display: none;
    }
    .el-tree-node__loading-icon {
        margin-top: 13px;
    }
}
</style>
