<template>
    <span>
        <slot :value="pointVal">{{ pointVal }}</slot>
        <el-button
            v-bind="btnProps"
            type="primary"
            :style="btnStyle"
            class="btn-ver-align-middle"
            @click="mapShow"
        >{{ pointVal ? '修改标注' : label }}</el-button>

        <!-- 弹窗 -->
        <el-dialog
            v-if="mapVisible"
            title="地标选择"
            append-to-body
            :visible.sync="mapVisible"
        >
            <baidu-map
                class="bm-view"
                :scroll-wheel-zoom="true"
                :min-zoom="10"
                :center="mapOpt.center || center"
                :zoom="13"
                :ak="mapConfig.ak"
                @click="mapClick"
                @ready="mapReady"
            >

                <bm-marker :position="pointVal | point" />
            </baidu-map>
            <el-row>
                <el-col
                    :span="24"
                    style="text-align: center;padding: 20px 20px 0;"
                >
                    <el-button
                        class=""
                        type="primary"
                        icon="el-icon-edit"
                        @click="mapVisible = false"
                    >保存</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </span>
</template>

<script>
import { point } from '@/utils'
import { map as mapConfig } from '@/nuxt.config.js'
import { BaiduMap, BmMarker } from 'vue-baidu-map'

export default {
    name: 'MapPicker',
    components: {
        BaiduMap,
        BmMarker,
    },
    filters: {
    },
    props: {
        label: {
            type: String,
            default: '添加地图标点'
        },
        btnStyle: {},
        btnProps: Object,
        value: {
            type: String,
        },
        msg: {
            type: String,
            default: '请先选择所在位置'
        },
        center: {}
    },
    data() {
        return {
            keyword: '',
            mapVisible: false,
            mapConfig,
            pointVal: '',
            mapOpt: {
            }
        }
    },
    computed: {
    },
    watch: {
        value: {
            handler(val) {
                this.pointVal = val
            },
            immediate: true
        },
        center(val) {
            // console.log(val);
        }
    },
    methods: {
        // 地图
        mapShow() {
            if (!Object.keys(this.center).length && !this.pointVal) {
                this.$message({
                    message: this.msg,
                    type: 'warning',
                    duration: 2000
                })
                this.mapVisible = false
            } else {
                this.mapVisible = true
            }
            // setTimeout(() => {
            if (this.pointVal) {
                this.mapOpt.center = { ...point(this.pointVal) }
            }
            // }, 500);
        },
        mapReady({ BMap, map }) {
            map.disableContinuousZoom()
            // this.$emit('ready', { BMap, map })
        },
        mapClick({ point }) {
            this.$emit('input', `${point.lng},${point.lat}`)
        },
    },
}
</script>

<style scoped>
/*地图*/
.bm-view {
  width: 100%;
  height: 450px;
}
</style>
