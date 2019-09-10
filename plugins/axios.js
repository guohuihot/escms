export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        console.log(config, 87);
        if (config.method == 'get') {
            config.params = Object.assign({}, config.params, config.data)
        }
        console.log(`Making request to ${config.url}`)
    })

    $axios.onResponse(response => {

    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
}
