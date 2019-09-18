import { Message } from 'element-ui'
export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        if (config.method == 'get') {
            config.params = Object.assign({}, config.params, config.data)
        } else if ([
            'put',
            'delete'
        ].includes(config.method)) {
            if (config.data.id) {
                config.url += `/${config.data.id}`
            }
        }

        // console.log(`Making request to ${config.url}`)
    })

    $axios.onResponse(response => {
        // console.log(response);
        if (response.config.method != 'get') {
            if (response.data.code == 1) {
                Message({
                    message: 'ok',
                    type: 'success',
                    duration: 1000,
                })
            } else {
                Message({
                    message: response.data.message,
                    type: 'error',
                    duration: 1000,
                })
            }
        } else if (response.data.code != 1) {
            Message({
                message: response.data.message,
                type: 'error',
                duration: 1000,
            })
        }
        return response.data
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        } else if (code == 401) {
            redirect('/login')
        }
    })
}
