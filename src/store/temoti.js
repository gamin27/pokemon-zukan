export default {
  namespaced: true,
  state: {
    temoti: [], //[{id: no, imgURL: ee, name: bb, types: [cc, dd], sprite: URL }]
    tmp: [],
    ids: [],
  },
  getters: {
    temoti: (state) => state.temoti,
    tmp: (state) => state.tmp,
    ids: (state) => state.ids,
  },
  mutations: {
    //enter choosed pokemon to tmp
    push(state, poke) {
      state.ids.push(poke.id)
      state.tmp.push(poke)
    },
    //remove cheesed pokemon from tmp
    remove(state, { newTmp, newIds }) {
      state.tmp = newTmp
      state.ids = newIds
    },
    //clear tmp
    clear(state) {
      state.tmp = []
    },
    //save tmp to temoti
    save(state) {
      state.temoti = state.tmp
      this.clear(state)
    },
    //delete temoti
    del(state) {
      state.temoti = []
    },
  },
  actions: {
    pushPoke({ commit }, poke) {
      commit('push', poke)
    },
    removePoke({ commit, state }, id) {
      const newTmp = state.tmp.filter((el) => el.id != id)
      const newIds = state.ids.filter((el) => el != id)
      commit('remove', { newTmp, newIds })
    },
    clearTmp({ commit }) {
      commit('clear')
    },
    saveTemoti({ commit }) {
      commit('save')
    },
    delTemoti({ commit }) {
      commit('del')
    },
  },
}
