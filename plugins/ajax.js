import axios from 'axios'
let options = {}
if (process.server) {
  // 配置基路由
  options.baseURL = 'http://localhost:5000' // http://123.xx.xx.xx:5000（服务端地址）
}
export default axios.create(options) // 注意这里是直接 export 了一个对象实例，而不是 Vue.use，这个插件不需要注册
