<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px" :style="`background-color: ${menuStyle.backgroundColor}`">
            <el-menu
                v-if="false"
                default-active="1-4-1"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                :background-color="menuStyle.backgroundColor"
                :text-color="menuStyle.textColor"
                :active-text-color="menuStyle.activeTextColor"
                router
                @open="handleOpen"
                @close="handleClose"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location" />
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">
                            选项1
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            选项2
                        </el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">
                            选项3
                        </el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">
                            选项1
                        </el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu" />
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item
                    index="3"
                    disabled
                >
                    <i class="el-icon-document" />
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting" />
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="padding: 0;">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    router
                    :background-color="menuStyle.backgroundColor"
                    :text-color="menuStyle.textColor"
                    :active-text-color="menuStyle.activeTextColor"
                    @select="handleSelect"
                >
                    <el-menu-item :index="item.value" :key="item.value" v-for="(item, i) in menuData">
                        {{ item.name }}
                    </el-menu-item>
                    <el-submenu index="2" style="float: right;">
                        <template slot="title">
                            abcdefg
                        </template>
                        <el-menu-item index="2-1">
                            选项1
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            选项2
                        </el-menu-item>
                        <el-menu-item index="2-3">
                            选项3
                        </el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">
                                选项4
                            </template>
                            <el-menu-item index="2-4-1">
                                选项1
                            </el-menu-item>
                            <el-menu-item index="2-4-2">
                                选项2
                            </el-menu-item>
                            <el-menu-item index="2-4-3">
                                选项3
                            </el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-main style="background-color: #fff"><nuxt-child /></el-main>
            <el-footer style="background-color: #fff">@escms</el-footer>
        </el-container>
    </el-container>
</template>
<script>

export default {
    async asyncData({ params, $axios }) {
        let res = await $axios.$get(`/api/menu`)
        // console.log(res)
        return {
            menuData: res.data
        }
    },
    data() {
        return {
            isCollapse: false,
            activeIndex: '1',
            activeIndex2: '1',
            menuStyle: {
                backgroundColor: '#545c64',
                textColor: '#fff',
                activeTextColor: '#ffd04b',
            }
        }
    },
    created() {
        this.$store.dispatch('getSubMenuData')
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },

    }
}
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
