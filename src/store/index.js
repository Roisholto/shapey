import Vue from 'vue'
import Vuex from 'vuex'
import historyStorage from '@/idb.js' ;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history:{

    }
  },
  mutations: {
    setHistory(state, payload){
      if(Array.isArray(payload))
        {
        payload.forEach(function(v){
          Vue.set(state.history, v.id, v)
          })
        }
      else
        {
        Vue.set(state.history, payload.id, payload)
        }
    },

    removeHistory(state, payload){
      if(Array.isArray(payload))
        {
        payload.forEach(function(v){
          Vue.delete(state.history, v) ;
          })
        }
      else
        {
        Vue.delete(state.history, payload) ;
        }
    }
  },
  actions: {
    // Expecting id as a string
    removeHistory(ctx, id){
      historyStorage
        .history
        .delete(id)
        .then(function(v){
          ctx.commit('removeHistory', id)
        })
        .catch(function(e){
          console.log('error deleting entry', e) ;
        })
    }
  },
  modules: {
  }
})
