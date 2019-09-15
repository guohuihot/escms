export const state = () => ({
    data: [],
    menuActive: '',
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
/*[{
    "id" : "5d7bb544a61223b58ce847ce",
    "name" : "菜单管理",
    "value" : "/admin/menu",
    "slug" : "",
    "parent_id" : "0",
    "no_delete" : true,
}]*/
const getTree = (list = [], parentID = '0') => {
    let tree = []
    list.forEach(item => {
        if (item.parent_id == parentID) {
            let children = getTree(list, item.id)
            if (children.length) {
                item.children = children
            }
            tree.push(item)
        }
    })
    return tree
}
const getTopById = (list, id) => {
    let actItem = list.find(item => item.id == id)
    if (actItem.parent_id != '0') {
        actItem = getTopById(list, actItem.parent_id) || {}
    }
    return actItem
}

export const actions = {
    async getMenuData({ commit, rootGetters }, { route }) {
        const res = await this.$axios.get('api/menu')
        if (res.code == 1) {
            commit('setData', res.data)
            let _path = route.path
            let actItem = res.data.find(item => item.value == _path)
            if (actItem.parent_id == '0') {
                // 顶级
                commit('setMenuActive', _path)
            } else {
                // 如果是三级，需要找到顶级数据
                let menuItem = getTopById(res.data, actItem.parent_id)
                commit('setMenuActive', menuItem.value)
            }
            commit('setSubMenuActive', _path)
        }
    },
    /**
     * 请求信息
     */
    getSubMenuData({ commit, rootGetters }, { route }) {
        /*const data = JSON.parse(JSON.stringify(options))
            // 是否可见
            .filter(item => checkAuth(item, rootGetters.userInfo))*/
        let ajaxFn = async () => {
            const res = await this.$axios.get('api/menu')
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
    setData(state, data) {
        // console.log('set', data);
        state.data = data
    },
    addMenu(state, data) {
        // console.log('add', data);
        state.data.push(data)
    },
    deleteMenu(state, data) {
        // console.log('del', data);
        let mIndex = state.data.findIndex(item => item.id == data.id)
        state.data.splice(mIndex, 1)
    },
    updateMenu(state, data) {
        state.data.forEach(item => {
            if (item.id == data.id) {
                Object.assign(item, data)
            }
        })
    },
    setSubMenuActive(state, subMenuActive) {
        state.subMenuActive = subMenuActive
    },
    setMenuActive(state, menuActive) {
        state.menuActive = menuActive
    },
}

export const getters = {
    data: state => state.data,
    allMenuData: state => {
        return getTree(state.data)
    },
    menuData: state => {
        return state.data.filter(item => item.parent_id == '0')
    },
    menuActive: state => state.menuActive,
    subMenuData: state => {
        let activeParentData = getTree(state.data).filter(item => {
            return item.value == state.menuActive
        })[0] || {}
        let activeData = activeParentData.children || []
        return activeData
    },
    subMenuActive    : state => state.subMenuActive,
}
