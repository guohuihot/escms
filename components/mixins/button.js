// 按钮通用设置, 带有弹窗的按钮
export default {
    components: {

    },
    mixins: [],
    props: {
        size: {
            type: String,
            default: 'mini'
        },
        type: {
            type: String,
            default: 'info'
        },
        plain: {
            type: Boolean,
            default: false
        },
        round: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        id: {
            type: [String, Number, Array],
            required: true
        },
        params: {
            type: Object,
            default() {
                return {};
            }
        },
        btnStyle: {

        },
    },
}
