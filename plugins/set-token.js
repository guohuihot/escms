// 由于axios插件里面不能使用localStorage，故单独做一个插件处理
export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
    })
}
