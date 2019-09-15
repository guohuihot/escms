<template>
    <el-container style="height: 100vh;">
        <el-aside
            :width="isCollapse ? '64px' : '200px'"
            :style="`background-color: ${menuStyle.backgroundColor}`"
        >
            <div
                style="height: 60px;text-align: center;line-height: 60px;color: #fff;"
                :style="{
                    fontSize: isCollapse ? '16px' : '22px',
                    backgroundColor: menuStyle.activeTextColor
                }"
            >
                ESCMS
            </div>
            <el-menu
                :default-active="subMenuActive"
                class="el-menu-vertical"
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
                            <i :class="item.icon || 'el-icon-document'" />
                            <span>{{ item.name }}</span>
                        </template>
                        <template v-for="(item1, index1) in item.children">
                            <!-- <el-submenu
                                v-if="item1.children.length"
                                :key="index1"
                                :index="item1.value"
                            >
                                <span slot="title">{{ item1.name }}</span>
                                <el-menu-item
                                    v-for="(item2, index2) in item1.children"
                                    :key="index2"
                                    :index="item2.value"
                                >
                                    {{ item2.name }}
                                </el-menu-item>
                            </el-submenu> -->
                                <!-- v-else -->
                            <el-menu-item
                                :key="index1"
                                :index="item1.value"
                            >
                                {{ item1.name }}<el-badge
                                    class="mark"
                                    :value="item1.mark"
                                />
                            </el-menu-item>
                        </template>
                    </el-submenu>

                    <el-menu-item
                        v-else
                        :key="index"
                        class="el-submenu__title"
                        :index="item.value || (index + '')"
                        :route="{name: item.value}"
                    >
                        <i :class="item.icon || 'el-icon-document'" />
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
                    style="line-height: 60px;
                        color: #fff;
                        text-align: center;
                        padding: 0 10px;
                        cursor: pointer;
                        float: left;
                        position: relative;
                        z-index: 99"
                    @click="isCollapse = !isCollapse"
                >
                    <i :class="['el-icon-s-fold', 'el-icon-s-unfold'][isCollapse * 1]" />
                    {{ {true: '展开', false: '收起'}[isCollapse] }}
                </div>
                <el-menu
                    :default-active="menuActive"
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
                            {{ userInfo.nickname || userInfo.username }}
                        </template>
                        <el-menu-item index="2-1">
                            <i class="el-icon-user" /> 我的资料
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <i class="el-icon-lock" /> 修改密码
                        </el-menu-item>
                        <el-menu-item index="2-3">
                            <i class="el-icon-switch-button" /> 退出
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item
                        index=""
                        style="float: right;"
                    >
                        <i class="el-icon-s-home" />
                        <a
                            href="/"
                            target="_blank"
                        > 网站首页</a>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <nuxt-child />
            </el-main>
            <el-footer>@escms</el-footer>
        </el-container>
    </el-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            isCollapse: false,
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
            userInfo: 'user/userInfo',
        }),
        openeds() {
            let arr = []
            this.subMenuData.forEach(function(item, i) {
                arr.push(`${i}`)
            })
            return arr
        }
    },
    created() {
    },
    mounted() {
        this.getMenuData({
            route: this.$route
        })
        this.getUserInfo()
    },
    methods: {
        ...mapActions({
            getMenuData: 'menu/getMenuData',
            getUserInfo: 'user/getUserInfo',
        }),
        ...mapMutations({
            setMenuActive: 'menu/setMenuActive',
            setSubMenuActive: 'menu/setSubMenuActive'
        }),
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        handleSelect(key, keyPath) {
            this.setMenuActive(key)
            this.setSubMenuActive(key)
        },

    }
}
</script>
<style>
    .el-menu-vertical {
        border-right: none;
    }
    .el-header, .el-footer {
    }

    .el-aside {
    }

    .el-main {
        padding: 10px;
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
