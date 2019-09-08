const mongoose = require('mongoose')
const Menu = mongoose.model('Menu')

const initMenu = async () => {
    let menu = await Menu.find({ no_delete: true })
    if (!menu.length) {
        await Menu.create({ name: '菜单管理', value: '/admin/menu', no_delete: true })
    }
}
initMenu().catch(err => {})
exports.getMenu = async (ctx) => {
    console.log(ctx.params, 333);
    try {
        menus = await Menu.find(ctx.params)
        ctx.status = 200
        ctx.body = JSON.stringify({
            status: 1,
            data: menus,
            /*data: [
                { title: '常规管理', value: '/admin/common' },
                { title: '会员管理', value: '/admin/member' },
                { title: '网站架构', value: '/admin/framework' },
                { title: '其它管理', value: '/admin/other' },
                { title: '系统设置', value: '/admin/config' },
                { title: '工作台', value: '/admin/desk' },
            ]*/
        })
    } catch (error) {
        ctx.body = {
            error: 1,
            info: error
        }
    }
}
