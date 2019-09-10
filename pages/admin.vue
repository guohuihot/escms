<template>
    <el-container style="height: 100vh;">
        <el-aside
            width="200px"
            :style="`background-color: ${menuStyle.backgroundColor}`"
        >
            <el-menu
                :default-active="subMenuActive"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                :background-color="menuStyle.backgroundColor"
                :text-color="menuStyle.textColor"
                :active-text-color="menuStyle.activeTextColor"
                router
                :collapse-transition="false"
                :default-openeds="isCollapse ? [] : openeds"
                @open="handleOpen"
                @close="handleClose"
            >
                <template
                    v-for="(item, index) in subMenuData"
                >
                    <el-submenu
                        v-if="item.children"
                        :key="index"
                        :index="index + ''"
                    >
                        <template
                            slot="title"
                            class="el-title"
                        >
                            <i :class="item.ico" />
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item
                            v-for="(item1, index1) in item.children"
                            :key="index1"
                            :index="item1.value || (index + '-' + index1)"
                            :route="{name: item1.value}"
                        >
                            {{ item1.name }}<el-badge
                                class="mark"
                                :value="item1.mark"
                            />
                        </el-menu-item>
                    </el-submenu>

                    <el-menu-item
                        v-else
                        :key="index"
                        class="el-submenu__title"
                        :index="item.value || (index + '')"
                        :route="{name: item.value}"
                    >
                        <i :class="item.ico" />
                        <span slot="title">{{ item.name }}<el-badge
                            class="mark"
                            :value="item.mark"
                        /></span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="padding: 0;">
                <div
                    style="padding: 5px;text-align: center;cursor: pointer;float: left"
                    @click="isCollapse = !isCollapse"
                >
                    <i :class="['el-icon-s-fold', 'el-icon-s-unfold'][isCollapse * 1]" />
                    {{ {true: '展开', false: '收起'}[isCollapse] }}
                </div>
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
                    <el-menu-item
                        v-for="(item, i) in menuData"
                        :key="item.value"
                        :index="item.value"
                    >
                        {{ item.name }}
                    </el-menu-item>
                    <el-submenu
                        index="2"
                        style="float: right;"
                    >
                        <template slot="title">
                            abcdefg
                        </template>
                        <el-menu-item index="2-1">
                            我的资料
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            选项2
                        </el-menu-item>
                        <el-menu-item index="2-3">
                            退出
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-main><nuxt-child /></el-main>
            <el-footer><!-- @escms --></el-footer>
        </el-container>
    </el-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
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
    async asyncData({ params, $axios }) {
        /*let res = await $axios.$get(`/api/menu`)
        // console.log(res)
        return {
            menuData: res.data
        }*/
    },
    computed: {
        ...mapGetters({
            menuData: 'menu/menuData',
            menuActive: 'menu/menuActive',
            subMenuData: 'menu/subMenuData',
            subMenuActive: 'menu/subMenuActive',
            // 'userInfo',
        }),
        openeds() {
            let arr = []
            this.subMenuData.forEach(function(item, i) {
                arr.push(`${i}`)
            })
            return arr
        }
    },
    mounted() {
        this.getSubMenuData({
            route: this.$route
        })
    },
    methods: {
        ...mapActions({
            getSubMenuData: 'menu/getSubMenuData',
        }),
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
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
  }

  .el-container:nth-child(7) .el-aside {
  }
</style>
