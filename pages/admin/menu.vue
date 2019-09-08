<template>
    <div
        v-loading="loading"
        style="background-color: #fff;"
    >
        <el-row
            :gutter="0"
            style="background-color: #fafafa;padding: 10px 20px;font-weight: bold;margin-bottom: 5px;"
        >
            <el-col :span="12">
                名称
            </el-col>
            <el-col
                :span="12"
                class="text-right"
            >
                操作
            </el-col>
        </el-row>
        <el-tree
            node-key="id"
            :props="props"
            :load="loadNode"
            class="el-tree3"
            lazy
            :indent="30"
            :default-expanded-keys="defaultExpandedKeys"
            :expand-on-click-node="false"
            :check-on-click-node="false"
        >
            <template #default="{ node, data }">
                <el-row
                    :gutter="0"
                    style="width: 100%;"
                >
                    <el-col :span="12">
                        {{ data.id }} - {{ node.label }}
                    </el-col>
                    <el-col
                        :span="12"
                        class="text-right"
                    >
                        <!-- <ys-button-dialog
                            :url="URL"
                            title="添加"
                            type="text"
                            size="mini"
                            :params="{
                                parent_id: data.id
                            }"
                            :form-items="formItems"
                            @ajaxThen="(res) => append(node, data, res.data)"
                        />
                        <ys-button-dialog
                            :url="URL"
                            title="修改"
                            type="text"
                            size="mini"
                            method="put"
                            :params="data"
                            :form-items="formItems"
                            @ajaxThen="(res) => edit(node, data, res.data)"
                        />

                        <ys-button-ajax
                            :id="data.id"
                            :url="URL"
                            class="text-danger"
                            type="text"
                            size="mini"
                            method="delete"
                            @ajaxThen="() => remove(node, data)"
                        >
                            删除
                        </ys-button-ajax> -->
                    </el-col>
                </el-row>
            </template>
        </el-tree>
    </div>
</template>
<script>
import axios                   from 'axios'
// import YsButtonDialog             from '@/components/YsButtonDialog'
// import YsButtonAjax               from '@/components/YsButtonAjax'
// import { localStorageRemoveItem } from '@/util/utils'

export default {
    name: 'ClassAreas',
    components: {
        // YsButtonDialog,
        // YsButtonAjax,
    },
    mixins: [],
    data() {
        return {
            title: '区域',
            URL: 'http://localhost:3000/api/menu',
            props: {
                label: 'name',
                isLeaf: 'leaf'
            },

            formItems: [
                {
                    label: '基本信息',
                    name: 'base',
                    children: [
                        {
                            label: '标题',
                            name: 'title',
                        },
                        {
                            label: '别名',
                            name: 'slug',
                        }
                    ]
                }
            ],
            defaultExpandedKeys: [],
            loading: false
        }
    },
    computed: {},
    created() {

    },
    methods: {
        async loadNode(node, resolve) {
            if (node.level === 0) {
                this.loading = true
                let res = await axios.get(this.URL + '/0')
                // console.log(res, 888);
                this.loading = false
                resolve(res.data.data)
                this.defaultExpandedKeys = res.data.data.map(item => item.id)
            }
            if (node.level > 0) {
                let res = await axios.get(this.URL + '/' + node.data.id)
                resolve(res.data.data)
            }
        },
        append(node, data, newChild) {
            if (!data.children) {
                this.$set(data, 'children', [])
            }
            data.children.push(newChild)
            this.updateCache()
        },
        edit(node, data, newChild) {
            let oldChild = data.children.find(item => item.id == newChild.id)
            Object.assign(oldChild, newChild)
            this.updateCache()
        },
        remove(node, data) {
            // console.log(node)
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
            this.updateCache()
        },
        updateCache() {
        }
    }
}
</script>
<style scoped>
    .el-tree3 /deep/ {
        .el-tree-node__content {
            height: auto;
            line-height: 44px;
            font-size: 14px;
            align-items: start;
        }
        .el-tree-node__content > .el-tree-node__expand-icon {
            padding-top: 16px;
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
