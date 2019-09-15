export const state = () => ({
    userInfo: {},
})

export const actions = {
    async getUserInfo({ commit, rootGetters }) {
        const res = await this.$axios.get('/api/userInfo')
        if (res.code == 1) {
            commit('setUserInfo', res.data)
        }
    },
}

export const mutations = {
    setUserInfo(state, data) {
        // console.log('set', data);
        state.userInfo = data
    },
    unsetUserInfo(state) {
        // console.log('set', data);
        state.data = {}
    }
}

export const getters = {
    userInfo: state => state.userInfo
}
