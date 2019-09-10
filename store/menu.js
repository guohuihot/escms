const pagesTree = {}
const options = [
    {
        name: '工作台',
        value: 'Desk',
        ico: '',
    },
    {
        name: '400电话',
        value: 'Hotline',
        visible: {
            role: []
        },
        ico: '',
        children: [
            {
                name: '400电话',
                value: 'Hotline',
                ico: 'el-icon-people iconfont',
                children: [
                    {
                        name: '通话记录',
                        value: 'CallList',
                        mark: '',
                        ico: '',
                    },
                ]
            }
        ]
    },
    {
        name: '权限管理',
        value: 'Authorities',
        ico: '',
        visible: {
            role: []
        },
        children: [
            {
                name: '用户管理',
                value: 'AuthoritiesUsersManage',
                ico: 'el-icon-people iconfont',
                children: [
                    {
                        name: '角色管理',
                        value: 'AuthoritiesRoles',
                        mark: '',
                        ico: '',
                    },
                    {
                        name: '用户管理',
                        value: 'AuthoritiesUsers',
                        mark: '',
                        ico: ''
                    },
                    {
                        name: '用户分组',
                        value: 'AuthoritiesUsersGroup',
                        mark: '',
                        ico: ''
                    },
                    {
                        name: '用户登录记录',
                        value: 'AuthoritiesLoginLogs',
                        mark: '',
                        ico: ''
                    },
                ]
            }
        ]
    },
]

export const state = () => ({
    // 数据信息
    menuData: [],
    menuActive: '',
    subMenuData: [],
    subMenuActive: '',
})
// 鉴权
const checkAuth = (menu, userInfo) => {
    return true
    let visible = menu.visible
    let role = userInfo.role
    if (role == '超管') {
        return true
    }
    if (role && visible) {
        if (typeof visible.role == 'string') {
            return role == visible.role
        }
        return visible.role.includes(role)
    }
    return true
}

const getTree = (list = [], parentID = 0) => {
    let tree = []
    list.forEach(item => {
        if (item.parent_id == parentID) {
            item.children = getTree(list, item.id)
            tree.push(item)
        }
    })
    return tree
}

export const actions = {
    /**
     * 请求信息
     */
    getSubMenuData({ commit, rootGetters }, { route }) {
        /*const data = JSON.parse(JSON.stringify(options))
            // 是否可见
            .filter(item => checkAuth(item, rootGetters.userInfo))*/
        let ajaxFn = async () => {
            const res = await this.$axios.$get('api/menu')
            const data = getTree(res.data)
            let subMenuData = []
            let menuActive = ''
            Object.keys(pagesTree).forEach((key) => {
                if (key == route.name || pagesTree[key].includes(route.name)) {
                    data.forEach(function(menu) {
                        if (menu.value == key) {
                            if (menu.children) {
                                // 是否可见
                                subMenuData = menu.children//.filter(item => checkAuth(item, rootGetters.userInfo))
                            } else if (menu.subs) {
                                // 兼容二级
                                menu.subs.forEach(menu1 => {
                                    if (menu1.children) {
                                        menu1.children.forEach(menu2 => {
                                            if (menu2.value == route.name) {
                                                subMenuData = [menu1]
                                            }
                                        })
                                    }
                                })
                            }
                            // subMenuData = [ ...menu.children ]
                            menuActive = key
                        }
                        delete menu.children
                    })
                }
            })
            commit('setMenuData', data)
            commit('setSubMenuData', subMenuData)
            commit('setMenuActive', menuActive)
        }
        ajaxFn()
    }
}

export const mutations = {
    setSubMenuData(state, data) {
        state.subMenuData = data
    },
    setSubMenuActive(state, subMenuActive) {
        state.subMenuActive = subMenuActive
    },
    setMenuData(state, data) {
        state.menuData = data
    },
    setMenuActive(state, menuActive) {
        state.menuActive = menuActive
    },
}

export const getters = {
    menuData  : state => state.menuData,
    menuActive: state => state.menuActive,
    subMenuData      : state => state.subMenuData,
    subMenuActive    : state => state.subMenuActive,
}
