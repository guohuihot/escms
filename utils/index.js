import dayjs from 'dayjs'
/**
 * replace替换
 * @param  {String} str  要转换的字符串
 * @param  {String|Regexp} reg 要匹配的客串
 * @return {String}     完成的字符串
 * @example
 * ```js
 * 'aaabbb'|replace(/aaa/, 'AAA') // => AAAbbb
 * ```
 */
export const replace = (str, reg, replacement) => {
    return str.replace(reg, replacement)
}

export const point = (str) => {
    if (typeof str ===  'string') {
        let [lng, lat] = str.split(',')
        return {lng, lat}
    }
    return str || {}
}

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0
}

// 格式化时间
export const date = (str, format = 'YYYY-MM-DD H:mm:ss') => {
    let isNumber = (obj) => {
        return obj === +obj
    }
    let _str = '---'
    if (str) {
        // 兼容任意格式
        if (isNumber(str)) {
            str *= 1000
        }
        _str = dayjs(str).format(format)
    }
    return _str
}

// 字符串截取
export const substr = (str, ...arg) => str ? str.substr(...arg) : str
// 默认值
export const Default = (str, value) => (str || value)

export const userName  = (user) =>  user ? (user.real_name ? user.real_name : user.username) : '---'

export const full = (data) => {
    let aValues = Object.values(data)
    let _temp = aValues.reduce((temp, cur, index) => {
        if ((Array.isArray(cur) && cur.length) || cur) {
            temp++
        }
        return temp
    }, 0)
    return (_temp / aValues.length * 100).toFixed(2) + '%'
}
