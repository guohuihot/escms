const mongoose = require('mongoose')
const Menu = mongoose.model('Menu')

const initMenu = async () => {
    let menu = await Menu.find({ no_delete: true })
    let menuData = { name: '菜单管理', value: '/admin/menu', parent_id: '0', no_delete: true }
    if (!menu.length) {
        menuData = await Menu.create(menuData)
    }
    return [menuData]
}

module.exports = async (ctx) => {
    let menus = []
    if (ctx.request.method == 'GET') {
        menus = await Menu.find(Object.assign({}, ctx.params, ctx.query))
            .sort({ sort: 1 })
        if (!menus.length) {
            menus = await initMenu()
        }
    } else if (ctx.request.method == 'POST') {
        menus = await Menu.create(ctx.request.body)
    } else if (ctx.request.method == 'PUT') {
        menus = ctx.request.body
        await Menu.updateOne({ _id: ctx.params.id }, menus)
    } else if (ctx.request.method == 'DELETE') {
        // console.log('del', ctx.params);
        menus = ctx.request.body
        await Menu.deleteOne({ _id: ctx.params.id })
    }
    ctx.send(menus)
}
